package backend.ssi.comment.domain

import org.litote.kmongo.Id
import java.time.Instant

data class Comment(
        val commentId: Id<Comment>,
        val content: String,
        val date: Instant
)
