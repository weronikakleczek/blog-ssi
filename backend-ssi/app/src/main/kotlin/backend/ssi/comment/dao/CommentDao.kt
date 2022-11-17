package backend.ssi.comment.dao

import backend.ssi.comment.domain.Comment
import backend.ssi.infrastructure.Dao
import backend.ssi.infrastructure.db.DbConfig
import com.mongodb.client.MongoCollection
import org.litote.kmongo.*

class CommentDao: Dao<Comment> {
    private val commentCollection: MongoCollection<Comment> = DbConfig.database.getCollection<Comment>("comment")

    override fun getById(id: String): Comment? = commentCollection.findOneById(id)

    override fun add(comment: Comment) = commentCollection.save(comment)

    override fun delete(id: String) { commentCollection.deleteOneById(id) }

    override fun update(updatedT: Comment) { commentCollection.replaceOneById(updatedT.commentId, updatedT) }

    // TODO: Funkcja do szukania komentarzy po treści?
    //fun findByContent(query: String): List<Comment> = commentCollection.find()
}
