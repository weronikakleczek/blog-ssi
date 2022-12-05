package backend.ssi.blogpost.service

import backend.ssi.blogpost.dao.BlogPostDao
import backend.ssi.blogpost.domain.BlogPost
import backend.ssi.blogpost.dto.CreatePostRequest
import backend.ssi.user.domain.User


class BlogPostService(private val blogPostDao: BlogPostDao) {
    fun getBlogPostById(id: String): BlogPost? = blogPostDao.getById(id)
    fun addBlogPost(createPostRequest: CreatePostRequest, author: User) = validateBlogPost(createPostRequest)
        ?.let { BlogPost.fromCreatePostRequest(it, author.userId) }
        ?.let {
            blogPostDao.add(it)
            it
        }


    private fun validateBlogPost(createPostRequest: CreatePostRequest): CreatePostRequest? {
        val isTitleValid: Boolean = createPostRequest.title.length in 5..50
        val isContentValid: Boolean = createPostRequest.content.length in 30..5000

        return if (isTitleValid && isContentValid) createPostRequest else null
    }
}