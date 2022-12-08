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
import org.litote.kmongo.json

class UserRoutes(private val userService: UserService) {

    fun getUnauthedUserRoutes(): RoutingHttpHandler =
        routes(getUserById())

    fun getAuthedUserRoutes(credentials: RequestContextLens<User>): RoutingHttpHandler =
        routes(deleteUserById(credentials), getUserByUsername(credentials))


    private fun getUserById(): RoutingHttpHandler =
        "/users/{id}" bind Method.GET to { req: Request ->
            req
                .let { req.path("id") }
                ?.let { userService.getUserById(it) }
                ?.let { Response(Status.OK).body(it.json) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun deleteUserById(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/users/{id}" bind Method.DELETE to { req: Request ->
            println("request")
            req
                .let { req.path("id") }
                ?.let {
                    println("user id $it")
                    if (credentials[req].entitlements == "admin") {
                        userService.deleteUserById(it)
                    }
                }?.let { Response(Status.OK).body(it.json) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun getUserByUsername(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/users/username/{name}" bind Method.GET to { req: Request ->
            req
                .let { req.path("name") }
                ?.let {
                        if(credentials[req].username == it) {
                            userService.getUserByUsername(it)?.let { user -> Response(Status.OK).body(user.json) }
                        } else {
                            Response(Status.UNAUTHORIZED)
                        }
                     }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

}
