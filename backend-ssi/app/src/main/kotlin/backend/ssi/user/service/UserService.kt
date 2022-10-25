package backend.ssi.user.service

import backend.ssi.user.domain.User
import backend.ssi.user.repository.UserRepository

class UserService(private val userRepository: UserRepository) {
    fun getUserById(id: String): User? = userRepository.getUserById(id)
    fun getUserByUsername(username: String): User? = userRepository.getUserByUsername(username)
}
