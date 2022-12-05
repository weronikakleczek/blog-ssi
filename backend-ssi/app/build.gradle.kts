
plugins {
    id("org.jetbrains.kotlin.jvm") version "1.6.21"
    application
}



repositories {
    mavenCentral()
}

dependencies {

    implementation(platform("org.jetbrains.kotlin:kotlin-bom"))
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("com.google.guava:guava:31.0.1-jre")
    implementation("org.http4k:http4k-core:4.32.3.0")
    implementation("org.http4k:http4k-server-jetty:4.32.3.0")
    implementation("org.http4k:http4k-format-jackson:4.32.3.0")

    implementation("org.litote.kmongo:kmongo:4.7.1")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")
    compileOnly("org.http4k:http4k-security-oauth:4.34.0.4")


    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
}

application {
    // Define the main class for the application.
    mainClass.set("backend.ssi.AppKt")
}

tasks.withType<Jar> {

    duplicatesStrategy = DuplicatesStrategy.EXCLUDE

    manifest {
        attributes["Main-Class"] = "backend.ssi.AppKt"
    }
    from(sourceSets.main.get().output)

    dependsOn(configurations.runtimeClasspath)
    from({
        configurations.runtimeClasspath.get()
            .filter { it.name.endsWith("jar") }
            .map { zipTree(it) }
    })
}