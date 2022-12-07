package backend.ssi.user.domain

import backend.ssi.user.dto.CreateUserRequest
import org.litote.kmongo.Id
import org.litote.kmongo.newId
import java.time.Instant

data class User(
    val userId: Id<User>,
    val username: String,
    val password: String,
    val firstName: String,
    val lastName: String,
    val aboutMe: String,
    val createdAt: Instant,
    val entitlements: String = "user"
) {
    companion object {
        fun fromCreateUserRequest(createUserRequest: CreateUserRequest) = User(
            newId(),
            createUserRequest.username,
            createUserRequest.password,
            createUserRequest.firstName,
            createUserRequest.lastName,
            createUserRequest.aboutMe,
            Instant.now()
        )
    }
}


