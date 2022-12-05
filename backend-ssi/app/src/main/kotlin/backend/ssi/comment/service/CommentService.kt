package backend.ssi.comment.service

import backend.ssi.comment.dao.CommentDao
import backend.ssi.comment.domain.Comment

class CommentService(private val commentDao: CommentDao) {
    fun getCommentById(id: String): Comment? = commentDao.getById(id)
}