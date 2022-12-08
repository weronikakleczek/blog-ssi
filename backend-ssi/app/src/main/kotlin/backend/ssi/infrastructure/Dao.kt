package backend.ssi.infrastructure

import com.mongodb.client.result.DeleteResult

interface Dao<T> {

    fun getAll(): List<T>

    fun getById(id: String): T?

    fun add(user: T)

    fun delete(id: String): DeleteResult

    fun update(updatedT: T)

}
