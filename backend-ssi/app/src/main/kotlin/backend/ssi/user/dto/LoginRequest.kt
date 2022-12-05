package backend.ssi.user.dto

data class LoginRequest(
    val username: String,
    val password: String,
)