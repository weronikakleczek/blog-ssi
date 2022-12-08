package backend.ssi.infrastructure.auth

import backend.ssi.user.dao.UserDao
import backend.ssi.user.domain.User
import backend.ssi.user.dto.CreateUserRequest
import backend.ssi.user.dto.LoginRequest
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Encoder
import io.jsonwebtoken.io.Encoders
import io.jsonwebtoken.security.Keys
import io.jsonwebtoken.security.SignatureException
import org.http4k.core.Filter
import org.http4k.filter.ServerFilters.BearerAuth
import org.http4k.lens.RequestContextLens
import java.security.Key
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*

class AuthService(private val userDao: UserDao) {

    private val key: Key = Keys.secretKeyFor(SignatureAlgorithm.HS256)
    private val encoder: Encoder<ByteArray, String> = Encoders.BASE64

    fun userBearerAuthFilter(credentials: RequestContextLens<User>): Filter =
        BearerAuth(credentials) { getUserFromJWT(it) }

    fun loginUser(loginRequest: LoginRequest): String? {
        val user =
            userDao.getByCredentials(loginRequest.username, encoder.encode(loginRequest.password.encodeToByteArray()))
                ?: return null
        return createJWT(user.username, Date.from(Instant.now().plus(2, ChronoUnit.DAYS)))
    }

    fun registerUser(createUserRequest: CreateUserRequest): User? = validateCreateUserRequest(createUserRequest)
        ?.let { User.fromCreateUserRequest(it.copy(password = encoder.encode(it.password.encodeToByteArray()))) }
        ?.let {
            userDao.add(it)
            it
        }


    private fun decodeToken(token: String): String? =
        try {
            Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).body.subject
        } catch (e: SignatureException) {
            println("Error decoding JWT Token")
            null
        }

    private fun createJWT(subject: String, expiresIn: Date): String? =
        Jwts.builder().setSubject(subject).setExpiration(expiresIn).signWith(key).compact()

    fun getUserFromJWT(token: String) = decodeToken(token)
        ?.let { userDao.getByUsername(it) }


    private fun validateCreateUserRequest(createUserRequest: CreateUserRequest): CreateUserRequest? {
        val isUsernameValid: Boolean = userDao.getByUsername(createUserRequest.username) == null
        val isFirstNameValid: Boolean = createUserRequest.firstName.length in 3..25
        val isLastNameValid: Boolean = createUserRequest.lastName.length in 3..25
        val isAboutMeValid: Boolean = createUserRequest.aboutMe.length in 10..200
        return if (isUsernameValid && isFirstNameValid && isLastNameValid && isAboutMeValid) createUserRequest else null
    }
}