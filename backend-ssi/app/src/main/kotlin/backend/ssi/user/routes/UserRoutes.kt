package backend.ssi.user.routes

import backend.ssi.user.domain.User
import backend.ssi.user.service.UserService
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.core.Response
import org.http4k.core.Status
import org.http4k.lens.RequestContextLens
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes

class UserRoutes(private val userService: UserService) {

    fun getUserRoutes(credentials: RequestContextLens<User>): RoutingHttpHandler =
        routes(getUserById(credentials), getUserByUsername(credentials))

    private fun getUserById(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/users/{id}" bind Method.GET to { req: Request ->
            req
                .let { req.path("id") }
                ?.let { userService.getUserById(it) }
                ?.let { user ->
                    // example how to get user inside some function
                    println("Request made by ${credentials.extract(req)}")
                    user
                }
                ?.let { Response(Status.OK).body(it.toString()) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun getUserByUsername(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/users" bind Method.GET to { req: Request ->
            req
                .let { req.query("username") }
                ?.let { userService.getUserByUsername(it) }
                ?.let { Response(Status.OK).body(it.toString()) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

}
