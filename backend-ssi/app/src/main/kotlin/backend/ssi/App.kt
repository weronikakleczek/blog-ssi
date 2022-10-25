package backend.ssi

import backend.ssi.user.repository.UserRepository
import backend.ssi.user.routes.UserRoutes
import backend.ssi.user.service.UserService
import org.http4k.core.Method.GET
import org.http4k.core.Request
import org.http4k.core.Response
import org.http4k.core.Status.Companion.OK
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes
import org.http4k.server.Jetty
import org.http4k.server.asServer

fun main() {

    val userRepository: UserRepository = UserRepository()
    val userService: UserService = UserService(userRepository)
    val userRoutes: UserRoutes = UserRoutes(userService)


    val chainedRoutes: RoutingHttpHandler = routes(
        userRoutes.getUserRoutes(),
        "/ping" bind GET to { _: Request -> Response(OK).body("pong!") },
        "/greet/{name}" bind GET to { req: Request ->
            val name: String? = req.path("name")
            Response(OK).body("hello ${name ?: "anon!"}")
        }
    )

    chainedRoutes.asServer(Jetty(9000)).start()
}
