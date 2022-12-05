package backend.ssi.blogpost.dto

import backend.ssi.blogpost.domain.BlogCategory

data class UpdatePostRequest(
    val title: String? = null,
    val category: BlogCategory? = null,
    val content: String? = null
)
