package backend.ssi.blogpost.dao

import backend.ssi.blogpost.domain.BlogPost
import backend.ssi.infrastructure.Dao
import backend.ssi.infrastructure.db.DbConfig
import com.mongodb.client.MongoCollection
import com.mongodb.client.result.DeleteResult
import org.litote.kmongo.*
import org.litote.kmongo.id.WrappedObjectId

class BlogPostDao : Dao<BlogPost> {

    companion object {
        private val blogPostCollection: MongoCollection<BlogPost> =
            DbConfig.database.getCollection<BlogPost>("blog_post")
    }

    override fun getAll(): List<BlogPost> =
        blogPostCollection.find().toList()

    override fun getById(id: String): BlogPost? {
        return blogPostCollection.findOne(BlogPost::blogPostId eq WrappedObjectId(id))
    }

    override fun add(blogPost: BlogPost) = blogPostCollection.save(blogPost)

    override fun delete(id: String) = blogPostCollection.deleteOneById(BlogPost::blogPostId eq WrappedObjectId(id))
    fun deleteByUserId(id: String): DeleteResult = blogPostCollection.deleteMany(BlogPost::authorId eq WrappedObjectId(id))

    override fun update(updatedT: BlogPost) {
        blogPostCollection.replaceOneById(updatedT.blogPostId, updatedT)
    }

}
