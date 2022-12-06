package backend.ssi.comment.routes

import backend.ssi.comment.dto.CreateCommentRequest
import backend.ssi.comment.service.CommentService
import backend.ssi.user.domain.User
import org.http4k.core.*
import org.http4k.format.Jackson.auto
import org.http4k.lens.BiDiBodyLens
import org.http4k.lens.RequestContextLens
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes
import org.litote.kmongo.json

class CommentRoutes(private val commentService: CommentService) {

    private val createCommentRequest: BiDiBodyLens<CreateCommentRequest> = Body.auto<CreateCommentRequest>().toLens()

    fun getAuthedCommentRoutes(credentials: RequestContextLens<User>): RoutingHttpHandler =
        routes(addComment(credentials))

    fun getUnauthedCommentRoutes(): RoutingHttpHandler =
        routes(getCommentById(), getCommensForBlogPost())

    private fun getCommentById(): RoutingHttpHandler =
        "/comment/{id}" bind Method.GET to { req: Request ->
            req
                .let { req.path("id") }
                ?.let { commentService.getCommentById(it) }
                ?.let { Response(Status.OK).body(it.json) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun getCommensForBlogPost(): RoutingHttpHandler =
        "/blog-post/{id}/comment" bind Method.GET to { req: Request ->
            req
                .let { req.path("id") }
                ?.let { commentService.getCommentsForBlogPost(it) }
                ?.let { Response(Status.OK).body(it.json) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun addComment(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/comment/add" bind Method.POST to { req: Request ->
            createCommentRequest.extract(req)
                .let { commentService.addComment(credentials.extract(req), it) }
                .let { Response(Status.OK).body(it.json) }
        }


}
