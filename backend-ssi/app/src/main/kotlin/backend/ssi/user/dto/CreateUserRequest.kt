package backend.ssi.user.dto

data class CreateUserRequest(
    val username: String,
    val password: String,
    val firstName: String,
    val lastName: String,
    val aboutMe: String,
)
