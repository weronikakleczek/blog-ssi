package backend.ssi.blogpost.domain

import java.time.Instant
import java.util.UUID

data class BlogPost(
        val blogPostId: UUID,
        val title: String,
        val content: String,
        val category: BlogCategory,
        val date: Instant
)