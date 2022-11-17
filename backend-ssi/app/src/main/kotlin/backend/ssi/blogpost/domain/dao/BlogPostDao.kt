package backend.ssi.blogpost.domain.dao

import backend.ssi.blogpost.domain.BlogPost
import backend.ssi.infrastructure.Dao
import backend.ssi.infrastructure.db.DbConfig
import com.mongodb.client.MongoCollection
import org.litote.kmongo.*

class BlogPostDao: Dao<BlogPost> {

    companion object {
        private val blogPostCollection: MongoCollection<BlogPost> = DbConfig.database.getCollection<BlogPost>("post")

    }

    override fun getById(id: String): BlogPost? = blogPostCollection.findOneById(id)

    override fun add(blogPost: BlogPost) = blogPostCollection.save(blogPost)

    override fun delete(id: String) { blogPostCollection.deleteOneById(id) }

    override fun update(updatedT: BlogPost) { blogPostCollection.replaceOneById(updatedT.blogPostId, updatedT) }

    // TODO: Funkcje do szukania po treści?
}
