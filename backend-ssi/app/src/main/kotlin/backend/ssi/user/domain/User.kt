package backend.ssi.user.domain

import org.litote.kmongo.Id
import java.time.Instant

data class User(
        val userId: Id<User>,
        val username: String,
        val password: String,
        val firstName: String,
        val lastName: String,
        val aboutMe: String,
        val createdAt: Instant,
)
