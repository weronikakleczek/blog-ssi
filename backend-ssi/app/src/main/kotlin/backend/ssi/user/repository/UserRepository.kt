package backend.ssi.user.repository

import backend.ssi.infrastructure.db.DbConfig.database
import backend.ssi.user.domain.User
import com.mongodb.client.MongoCollection
import org.litote.kmongo.eq
import org.litote.kmongo.findOne
import org.litote.kmongo.getCollection
import org.litote.kmongo.id.WrappedObjectId

class UserRepository {

    private val userCollection: MongoCollection<User> = database.getCollection<User>("user")

    fun getUserById(id: String): User? = userCollection.findOne(User::userId eq WrappedObjectId(id))
    fun getUserByUsername(username: String): User? = userCollection.findOne(User::username eq username)

}
