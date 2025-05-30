FROM eclipse-temurin:24-jdk-alpine

WORKDIR /app

COPY target/.

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]