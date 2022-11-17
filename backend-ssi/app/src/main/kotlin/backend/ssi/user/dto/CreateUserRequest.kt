package backend.ssi.user.dto

data class CreateUserRequest(
    val email: String,
    val username: String,
    val password: String
)
