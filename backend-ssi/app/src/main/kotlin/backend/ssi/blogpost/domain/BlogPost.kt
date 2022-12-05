package backend.ssi.blogpost.domain

import backend.ssi.blogpost.dto.CreatePostRequest
import backend.ssi.user.domain.User
import org.litote.kmongo.Id
import org.litote.kmongo.newId
import java.time.Instant

data class BlogPost(
    val blogPostId: Id<BlogPost>,
    val authorId: Id<User>,
    val title: String,
    val content: String,
    val category: BlogCategory,
    val date: Instant
) {
    companion object {
        fun fromCreatePostRequest(createPostRequest: CreatePostRequest, authorId: Id<User>) = BlogPost(
            newId(),
            authorId,
            createPostRequest.title,
            createPostRequest.content,
            createPostRequest.category,
            Instant.now()
        )
    }
}
