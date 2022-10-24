package backend.ssi.comment.domain

import java.time.Instant
import java.util.UUID

data class Comment(
        val commentId: UUID,
        val content: String,
        val date: Instant
)