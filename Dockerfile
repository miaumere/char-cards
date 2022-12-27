FROM maven:3.8.6-openjdk-11-slim AS builder
# Copy source
COPY ./ /app/
# Build app
WORKDIR /app
RUN mvn clean package

FROM amazoncorretto:11.0.16-alpine3.16
COPY --from=builder /app/target/*.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","./app.jar"]