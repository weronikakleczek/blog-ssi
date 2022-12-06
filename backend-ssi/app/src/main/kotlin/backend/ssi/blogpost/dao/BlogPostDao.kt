package backend.ssi.blogpost.dao

import backend.ssi.blogpost.domain.BlogPost
import backend.ssi.infrastructure.Dao
import backend.ssi.infrastructure.db.DbConfig
import com.mongodb.client.MongoCollection
import org.litote.kmongo.*
import org.litote.kmongo.id.WrappedObjectId

class BlogPostDao : Dao<BlogPost> {

    companion object {
        private val blogPostCollection: MongoCollection<BlogPost> = DbConfig.database.getCollection<BlogPost>("post")

    }

    override fun getAll(): List<BlogPost> =
        blogPostCollection.find().toList()

    override fun getById(id: String): BlogPost? =
        blogPostCollection.findOne(BlogPost::blogPostId eq WrappedObjectId(id))

    override fun add(blogPost: BlogPost) = blogPostCollection.save(blogPost)

    override fun delete(id: String) {
        blogPostCollection.deleteOneById(id)
    }

    override fun update(updatedT: BlogPost) {
        blogPostCollection.replaceOneById(updatedT.blogPostId, updatedT)
    }

}
