package backend.ssi.comment.domain

import backend.ssi.blogpost.domain.BlogPost
import backend.ssi.user.domain.User
import org.litote.kmongo.Id
import java.time.Instant

data class Comment(
        val commentId: Id<Comment>,
        val authorId: Id<User>,
        val blogPostId: Id<BlogPost>,
        val content: String,
        val date: Instant
)
