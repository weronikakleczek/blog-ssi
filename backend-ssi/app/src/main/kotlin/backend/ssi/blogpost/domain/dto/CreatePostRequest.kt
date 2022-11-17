package backend.ssi.blogpost.domain.dto

import backend.ssi.blogpost.domain.BlogCategory

data class CreatePostRequest(
    val title: String,
    val category: BlogCategory,
    val content: String
)
