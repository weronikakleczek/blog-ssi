package backend.ssi.blogpost.domain

import org.litote.kmongo.Id
import java.time.Instant

data class BlogPost(
    val blogPostId: Id<BlogPost>,
    val title: String,
    val content: String,
    val category: BlogCategory,
    val date: Instant
)
