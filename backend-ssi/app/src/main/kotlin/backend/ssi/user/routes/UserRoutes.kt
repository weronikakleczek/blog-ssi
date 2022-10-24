package backend.ssi.user.routes

import backend.ssi.user.service.UserService
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.core.Response
import org.http4k.core.Status
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes

class UserRoutes(private val userService: UserService) {

    fun getUserRoutes(): RoutingHttpHandler = routes(getUserById, getUserByUsername)


    private val getUserById: RoutingHttpHandler = "/users/{id}" bind Method.GET to { req: Request ->
        req.path("id")
            ?.let { userService.getUserById(it) }
            ?.let { Response(Status.OK).body(it.toString()) }
            ?: Response(Status.NOT_FOUND).body("Not Found")
    }

    private val getUserByUsername: RoutingHttpHandler = "/users" bind Method.GET to { req: Request ->
        req.query("username")
            ?.let { userService.getUserByUsername(it) }
            ?.let { Response(Status.OK).body(it.toString()) }
            ?: Response(Status.NOT_FOUND).body("Not Found")
    }

}
