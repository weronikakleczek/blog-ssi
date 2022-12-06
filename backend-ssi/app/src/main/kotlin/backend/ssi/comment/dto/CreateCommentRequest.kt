package backend.ssi.comment.dto

data class CreateCommentRequest(
    val content: String,
    val blogPostId: String,
)
