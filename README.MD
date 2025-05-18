# 🎫 Sistema de Gestión de Acceso a Eventos con QR

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8+-blue.svg)](https://www.mysql.com/)
[![Maven](https://img.shields.io/badge/Maven-3.9+-brightgreen.svg)](https://maven.apache.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green)](https://spring.io/projects/spring-boot)

Aplicación Spring Boot robusta para la gestión integral de eventos: registros, pagos y control de acceso mediante códigos QR. Cuenta con una API RESTful bien definida y medidas de seguridad básicas para proteger la información.

## 📋 Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu entorno de desarrollo:

* **Java**: Versión 21 o superior ([Descargar](https://www.oracle.com/java/technologies/javase-jdk21-downloads.html))
* **MySQL**: Versión 8 o superior ([Descargar](https://www.mysql.com/downloads/))
* **Maven**: Versión 3.9 o superior ([Descargar](https://maven.apache.org/download.cgi))
* **Postman** o **cURL**: Para la prueba y consumo de la API RESTful ([Postman](https://www.postman.com/downloads/) / [cURL](https://curl.se/download/))

## 🚀 Instalación

Sigue estos sencillos pasos para poner en marcha la aplicación:

1.  **Clonar el repositorio:**

    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd nicolas-12000-event-access
    ```

2.  **Crear la base de datos MySQL:**

    Ejecuta la siguiente sentencia SQL en tu cliente de MySQL:

    ```sql
    CREATE DATABASE seminario;
    ```

3.  **Configurar las credenciales de la base de datos:**

    Edita el archivo `application.properties` ubicado en la siguiente ruta:

    ```
    src/main/resources/application.properties
    ```

    Y actualiza las propiedades de conexión con tus credenciales de MySQL:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/seminario
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_contraseña
    ```

## ⚙️ Ejecución

Para iniciar la aplicación Spring Boot, ejecuta el siguiente comando desde la raíz del proyecto:

```bash
./mvnw spring-boot:run
Una vez que la aplicación se haya iniciado correctamente, estará disponible en la siguiente URL:

http://localhost:8082

## 📌 Endpoints Principales de la API

A continuación, se describen los principales endpoints de la API RESTful:

### Eventos (`/api/events`)

* `GET /api/events`: Obtiene la lista de todos los eventos.
* `POST /api/events`: Crea un nuevo evento.

    **Ejemplo de cuerpo de la petición (JSON):**

    ```json
    {
      "name": "Concierto Rock",
      "place": "Estadio Nacional",
      "description": "Evento musical"
    }
    ```

    **Ejemplo de uso con cURL:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "name": "Concierto Rock",
      "place": "Estadio Nacional",
      "description": "Evento musical"
    }' http://localhost:8082/api/events
    ```

* `PUT /api/events/{eventId}`: Actualiza la información de un evento específico.
* `DELETE /api/events/{eventId}`: Elimina un evento.

### Estudiantes (`/api/students`)

* `POST /api/students`: Registra un nuevo estudiante.
* `GET /api/students/{identityDocument}`: Obtiene la información de un estudiante por su documento de identidad.

### Pagos (`/api/payments`)

* `POST /api/payments`: Registra un nuevo pago.
* `GET /api/payments/event/{eventId}/student/{identityDocument}`: Obtiene el historial de pagos de un estudiante para un evento específico.

### Registros (`/api/registrations`)

* `POST /api/registrations`: Registra a un estudiante en un evento.
* `GET /api/registrations/{id}`: Obtiene la información de un registro específico.

## 📚 Documentación de la API

Para explorar y probar la API de manera interactiva, puedes acceder a la documentación generada por Swagger UI en la siguiente URL:

http://localhost:8082/swagger-ui.html

## 🛠️ Mejoras Pendientes

Esta aplicación se encuentra en desarrollo y las siguientes funcionalidades están en la hoja de ruta:

* Implementación del controlador `QrController.java` para la generación y gestión de códigos QR.
* Adición de autenticación y autorización basada en JWT para asegurar los endpoints de la API.
* Generación de reportes en formato PDF y/o Excel con información relevante de los eventos y registros.
* Integración con una pasarela de pagos real para procesar transacciones de forma segura.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas colaborar en este proyecto, sigue estos pasos:

1.  Haz un fork del repositorio.
2.  Crea una rama con tu nueva funcionalidad: `git checkout -b feature/nueva-funcionalidad`
3.  Realiza tus cambios y commitealos: `git commit -m 'Añadir funcionalidad'`
4.  Sube tus cambios a tu fork: `git push origin feature/nueva-funcionalidad`
5.  Abre un Pull Request para que podamos revisar tus contribuciones.