package backend.ssi.comment.routes

import backend.ssi.comment.service.CommentService
import backend.ssi.user.domain.User
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.core.Response
import org.http4k.core.Status
import org.http4k.lens.RequestContextLens
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes

class CommentRoutes(private val commentService: CommentService) {

    fun getCommentRoutes(credentials: RequestContextLens<User>): RoutingHttpHandler =
        routes(getCommentById(credentials))

    private fun getCommentById(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/comment/{id}" bind Method.GET to { req: Request ->
            req
                .let { req.path("id") }
                ?.let { commentService.getCommentById(it) }
                ?.let { Response(Status.OK).body(it.toString()) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }


}
