package backend.ssi.comment.dao

import backend.ssi.comment.domain.Comment
import backend.ssi.infrastructure.Dao
import backend.ssi.infrastructure.db.DbConfig
import com.mongodb.client.MongoCollection
import org.litote.kmongo.*
import org.litote.kmongo.id.WrappedObjectId

class CommentDao : Dao<Comment> {
    companion object {
        private val commentCollection: MongoCollection<Comment> = DbConfig.database.getCollection<Comment>("comment")
    }

    override fun getAll(): List<Comment> =
        commentCollection.find().toList()

    override fun getById(id: String): Comment? = commentCollection.findOne(Comment::commentId eq WrappedObjectId(id))

    override fun add(comment: Comment) = commentCollection.save(comment)



    override fun delete(id: String) = commentCollection.deleteOneById(Comment::commentId eq WrappedObjectId(id))


    override fun update(updatedT: Comment) {
        commentCollection.replaceOneById(updatedT.commentId, updatedT)
    }

    fun getCommentsForBlogPost(id: String): List<Comment> =
        commentCollection.find(Comment::blogPostId eq WrappedObjectId(id)).toList()
}
