plugins {
    application
    java
}
repositories {
    mavenLocal()
    mavenCentral()

}

dependencies {
    implementation("io.dagger:dagger-java-sdk:1.0.0-SNAPSHOT")
    implementation("org.slf4j:slf4j-simple:2.0.11")
    runtimeOnly("io.netty:netty-resolver-dns-native-macos:4.1.106.Final:osx-aarch_64")
}

application {
    mainClass = "run.fabian.Hugo"
}


