package backend.ssi.user.dao

import backend.ssi.infrastructure.Dao
import backend.ssi.infrastructure.db.DbConfig
import backend.ssi.user.domain.User
import com.mongodb.client.MongoCollection
import org.litote.kmongo.*


class UserDao: Dao<User> {
    private val userCollection: MongoCollection<User> = DbConfig.database.getCollection<User>("user")

    override fun getById(id: String): User? = userCollection.findOneById(id)

    override fun add(user: User) = userCollection.save(user)

    override fun delete(id: String) { userCollection.deleteOneById(User::userId) }

    override fun update(updatedT: User) { userCollection.replaceOneById(updatedT.userId, updatedT) }

    fun getByUsername(username: String): User? = userCollection.findOne(User::username eq username)
}
