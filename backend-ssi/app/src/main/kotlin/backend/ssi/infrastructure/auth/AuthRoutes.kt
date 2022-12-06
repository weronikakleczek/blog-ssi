package backend.ssi.infrastructure.auth

import backend.ssi.user.dto.CreateUserRequest
import backend.ssi.user.dto.LoginRequest
import org.http4k.core.*
import org.http4k.format.Jackson.auto
import org.http4k.lens.BiDiBodyLens
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.routes
import org.litote.kmongo.json

class AuthRoutes(private val authService: AuthService) {

    fun getAuthRoutes(): RoutingHttpHandler = routes(register, login)


    private val createUserRequestLens: BiDiBodyLens<CreateUserRequest> = Body.auto<CreateUserRequest>().toLens()
    private val loginRequestLens: BiDiBodyLens<LoginRequest> = Body.auto<LoginRequest>().toLens()


    private val register: RoutingHttpHandler = "/auth/register" bind Method.POST to { req: Request ->
        createUserRequestLens.extract(req)
            .let { authService.registerUser(it) }
            ?.let { Response(Status.OK).body(it.json) }
            ?: Response(Status.BAD_REQUEST).body("Could not register user.")
    }

    private val login: RoutingHttpHandler = "/auth/login" bind Method.POST to { req: Request ->
        loginRequestLens.extract(req)
            .let { authService.loginUser(it) }
            ?.let { Response(Status.OK).body(it) }
            ?: Response(Status.NOT_FOUND).body("Not Found")
    }
}