package backend.ssi.infrastructure.db

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoDatabase
import org.bson.UuidRepresentation
import org.litote.kmongo.KMongo

object DbConfig {

    // this can be moved to some config file or anything external in the future
    private const val mongoUser: String = "ssi"
    private const val mongoPassword: String = "ssi"
    private const val mongoHost: String = "localhost"
    private const val mongoPort: String = "27017"
    private const val connectionString: String = "mongodb://$mongoUser:$mongoPassword@$mongoHost:$mongoPort"

    private val client: MongoClient = KMongo.createClient(
        MongoClientSettings
            .builder()
            .uuidRepresentation(UuidRepresentation.STANDARD)
            .applyConnectionString(ConnectionString(connectionString))
            .build()
    )

    val database: MongoDatabase = client.getDatabase("db-ssi")
}