package backend.ssi.user.dao

import backend.ssi.infrastructure.Dao
import backend.ssi.infrastructure.db.DbConfig
import backend.ssi.user.domain.User
import com.mongodb.client.MongoCollection
import org.litote.kmongo.*
import org.litote.kmongo.id.WrappedObjectId


class UserDao : Dao<User> {

    companion object {
        private val userCollection: MongoCollection<User> = DbConfig.database.getCollection<User>("user")
    }

    override fun getAll(): List<User> = userCollection.find().toList()

    override fun getById(id: String): User? = userCollection.findOne(User::userId eq WrappedObjectId(id))

    override fun add(user: User) = userCollection.save(user)

    override fun delete(id: String) = userCollection.deleteOne(User::userId eq WrappedObjectId(id))

    override fun update(updatedT: User) {
        userCollection.replaceOneById(updatedT.userId, updatedT)
    }

    fun getByUsername(username: String): User? = userCollection.findOne(User::username eq username)

    fun getByCredentials(username: String, password: String): User? =
        userCollection.findOne(User::username eq username, User::password eq password)
}
