package backend.ssi.user.service

import backend.ssi.user.dao.UserDao
import backend.ssi.user.domain.User

class UserService(private val userDao: UserDao) {
    fun getUserById(id: String): User? = userDao.getById(id)
    fun deleteUserById(id: String) = userDao.delete(id)
    fun getUserByUsername(username: String): User? = userDao.getByUsername(username)
}
