package backend.ssi.user.dto

data class UpdateUserRequest(
    val password: String? = null,
    val firstName: String? = null,
    val lastName: String? = null,
    val aboutMe: String? = null
)
