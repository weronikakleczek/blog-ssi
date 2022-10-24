package backend.ssi.user.domain

import java.time.Instant
import java.util.UUID

data class User(
        val userId: UUID,
        val username: String,
        val password: String,
        val firstName: String,
        val lastName: String,
        val aboutMe: String,
        val createdAt: Instant
)