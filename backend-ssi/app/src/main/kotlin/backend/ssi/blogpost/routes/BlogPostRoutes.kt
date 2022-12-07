package backend.ssi.blogpost.routes

import backend.ssi.blogpost.dto.CreatePostRequest
import backend.ssi.blogpost.service.BlogPostService
import backend.ssi.user.domain.User
import org.http4k.core.*
import org.http4k.format.Jackson.auto
import org.http4k.lens.BiDiBodyLens
import org.http4k.lens.RequestContextLens
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes
import org.litote.kmongo.Id
import org.litote.kmongo.json

class BlogPostRoutes(private val blogPostService: BlogPostService) {

    private val loginRequestLens: BiDiBodyLens<CreatePostRequest> = Body.auto<CreatePostRequest>().toLens()


    fun getAuthedBlogPostRoutes(credentials: RequestContextLens<User>): RoutingHttpHandler =
        routes(addBlogPost(credentials), deleteBlogPost(credentials), deleteBlogPostByUserId(credentials))

    fun getUnauthedBlogPostRoutes(): RoutingHttpHandler = routes(getBlogPosts(), getBlogPostById())

    private fun getBlogPosts(): RoutingHttpHandler =
        "/blog-post" bind Method.GET to { req: Request ->
            req
                .let { blogPostService.getBlogPosts() }
                .let { Response(Status.OK).body(it.json) }
        }

    private fun getBlogPostById(): RoutingHttpHandler =
        "/blog-post/{id}" bind Method.GET to { req: Request ->
            req
                .let { req.path("id") }
                ?.let { blogPostService.getBlogPostById(it) }
                ?.let { Response(Status.OK).body(it.json) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    // todo: implement this on frontend
    private fun addBlogPost(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/blog-post" bind Method.POST to { req: Request ->
            loginRequestLens.extract(req)
                .let { blogPostService.addBlogPost(it, credentials.extract(req)) }
                ?.let { Response(Status.OK).body(it.json) }
                ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun deleteBlogPost(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/blog-post/{id}" bind Method.DELETE to { req: Request ->
            req.path("id")?.let { blogPostId ->
                getAuthor(blogPostId)?.let {
                    if (credentials[req].userId == it || credentials[req].entitlements == "admin") {
                        blogPostService.deleteBlogPost(blogPostId)
                            .let { Response(Status.OK).body("Successfully deleted post") }
                    } else Response(Status.UNAUTHORIZED).body("Not authorized")
                }
            } ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun deleteBlogPostByUserId(credentials: RequestContextLens<User>): RoutingHttpHandler =
        "/blog-post/user/{userId}" bind Method.DELETE to { req: Request ->
            req.path("userId")?.let { userId ->
                println(userId)
                    if (credentials[req].entitlements == "admin") {
                        blogPostService.deleteBlogsByUserId(userId)
                            .let { Response(Status.OK).body("Successfully deleted posts") }
                    } else Response(Status.UNAUTHORIZED).body("Not authorized")
            } ?: Response(Status.NOT_FOUND).body("Not Found")
        }

    private fun getAuthor(blogPostId: String): Id<User>? = blogPostService.getBlogPostById(blogPostId)?.authorId
}
