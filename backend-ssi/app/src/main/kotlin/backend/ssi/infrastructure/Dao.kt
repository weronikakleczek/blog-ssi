package backend.ssi.infrastructure

interface Dao<T> {

    fun getById(id: String): T?

    fun add(user: T)

    fun delete(id: String)

    fun update(updatedT: T)

}