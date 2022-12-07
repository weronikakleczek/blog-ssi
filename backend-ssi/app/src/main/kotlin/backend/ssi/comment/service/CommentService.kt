package backend.ssi.comment.service

import backend.ssi.comment.dao.CommentDao
import backend.ssi.comment.domain.Comment
import backend.ssi.comment.dto.CreateCommentRequest
import backend.ssi.user.domain.User
import org.bson.types.ObjectId
import org.litote.kmongo.id.toId
import org.litote.kmongo.newId
import java.time.Instant

class CommentService(private val commentDao: CommentDao) {
    fun getCommentById(id: String): Comment? = commentDao.getById(id)
    fun getCommentsForBlogPost(id: String): List<Comment> = commentDao.getCommentsForBlogPost(id)
    fun addComment(user: User, ccr: CreateCommentRequest) = commentDao.add(
        Comment(
            newId(),
            user.userId,
            ObjectId(ccr.blogPostId).toId(),
            ccr.content,
            Instant.now()
        )
    )
}