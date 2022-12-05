package backend.ssi

import backend.ssi.blogpost.dao.BlogPostDao
import backend.ssi.blogpost.routes.BlogPostRoutes
import backend.ssi.blogpost.service.BlogPostService
import backend.ssi.comment.dao.CommentDao
import backend.ssi.comment.routes.CommentRoutes
import backend.ssi.comment.service.CommentService
import backend.ssi.infrastructure.auth.AuthRoutes
import backend.ssi.infrastructure.auth.AuthService
import backend.ssi.user.dao.UserDao
import backend.ssi.user.domain.User
import backend.ssi.user.routes.UserRoutes
import backend.ssi.user.service.UserService
import org.http4k.core.Filter
import org.http4k.core.RequestContexts
import org.http4k.core.then
import org.http4k.filter.CorsPolicy
import org.http4k.filter.ServerFilters
import org.http4k.filter.ServerFilters.InitialiseRequestContext
import org.http4k.lens.RequestContextKey
import org.http4k.lens.RequestContextLens
import org.http4k.routing.RoutingHttpHandler
import org.http4k.routing.routes
import org.http4k.server.Jetty
import org.http4k.server.asServer

fun main() {

    // DAOs
    val userDao = UserDao()
    val blogPostDao = BlogPostDao()
    val commentDao = CommentDao()

    // Services
    val authService = AuthService(userDao)
    val userService = UserService(userDao)
    val blogPostService = BlogPostService(blogPostDao)
    val commentService = CommentService(commentDao)

    // Routes
    val authRoutes = AuthRoutes(authService)
    val userRoutes = UserRoutes(userService)
    val blogPostRoutes = BlogPostRoutes(blogPostService)
    val commentRoutes = CommentRoutes(commentService)

    // Auth
    val contexts = RequestContexts()
    val contextCredentials: RequestContextLens<User> = RequestContextKey.required(contexts)
    val corsFilter: Filter = ServerFilters.Cors.invoke(CorsPolicy.UnsafeGlobalPermissive)
    val jwtBearerFilter: (RequestContextLens<User>) -> Filter = { authService.userBearerAuthFilter(it) }

    // Combined routes
    val authorizedRoutes: (RequestContextLens<User>) -> RoutingHttpHandler = { credentials ->
        jwtBearerFilter(credentials).then(
            routes(
                userRoutes.getUserRoutes(credentials),
                blogPostRoutes.getBlogPostRoutes(credentials),
                commentRoutes.getCommentRoutes(credentials)
            )
        )
    }

    val allRoutes: (RequestContextLens<User>) -> RoutingHttpHandler = {
        routes(
            authRoutes.getAuthRoutes(),
            authorizedRoutes(it)
        )
    }

    // Server init
    InitialiseRequestContext(contexts)
        .then(corsFilter)
        .then(allRoutes(contextCredentials))
        .asServer(Jetty(9000))
        .start()
}
