# 🎫 Sistema de Gestión de Acceso a Eventos con QR

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8+-blue.svg)](https://www.mysql.com/)
[![Maven](https://img.shields.io/badge/Maven-3.9+-brightgreen.svg)](https://maven.apache.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green)](https://spring.io/projects/spring-boot)

Aplicación Spring Boot robusta para la gestión integral de eventos: registros, pagos y control de acceso mediante códigos QR. Cuenta con una API RESTful bien definida y medidas de seguridad básicas para proteger la información.

---

## 📦 Arquitectura

El proyecto sigue una arquitectura **hexagonal (puertos y adaptadores)**, separando claramente la lógica de negocio, la infraestructura y los modelos de dominio. Esto facilita la mantenibilidad, escalabilidad y pruebas.

- **application**: Casos de uso y puertos (interfaces).
- **infrastructure**: Adaptadores de entrada (controladores) y salida (persistencia, servicios externos).
- **model**: Entidades de dominio.
- **config**: Configuración de seguridad, CORS, etc.

---

## 📋 Requisitos Previos

- **Java**: Versión 21 o superior ([Descargar](https://www.oracle.com/java/technologies/javase-jdk21-downloads.html))
- **MySQL**: Versión 8 o superior ([Descargar](https://www.mysql.com/downloads/))
- **Maven**: Versión 3.9 o superior ([Descargar](https://maven.apache.org/download.cgi))
- **Postman** o **cURL**: Para pruebas de la API ([Postman](https://www.postman.com/downloads/) / [cURL](https://curl.se/download/))

---

## 🚀 Instalación

1. **Clona el repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd event-access-api
    ```

2. **Crea la base de datos MySQL:**
    ```sql
    CREATE DATABASE seminario;
    ```

3. **Configura las credenciales de la base de datos:**
    Edita `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/seminario
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_contraseña
    ```

---

## ⚙️ Ejecución

Para iniciar la aplicación Spring Boot:
```bash
./mvnw spring-boot:run
```
La API estará disponible en:  
[http://localhost:8082](http://localhost:8082)

---

## 📌 Endpoints Principales de la API

### Eventos (`/api/events`)
- `GET /api/events`: Lista todos los eventos.
- `POST /api/events`: Crea un evento.
- `PUT /api/events/{eventId}`: Actualiza un evento.
- `DELETE /api/events/{eventId}`: Elimina un evento.

### Estudiantes (`/api/students`)
- `POST /api/students`: Registra un estudiante.
- `GET /api/students/{identityDocument}`: Consulta un estudiante.

### Registros (`/api/attendance`)
- `POST /api/attendance`: Registra a un estudiante en un evento.
- `GET /api/attendance/{id}`: Consulta un registro.

### QR Codes (`/api/qr_codes`)
- `POST /api/qr_codes/generate`: Genera un QR para un estudiante y evento.
- `POST /api/qr_codes/validate/{qrId}`: Valida un QR.
- `DELETE /api/qr_codes/{qrId}`: Elimina un QR (si implementado).

---

## 🛡️ Seguridad

- **CORS**: Permitido solo para `http://localhost:3000` (ajusta para producción).
- **CSRF**: Deshabilitado (solo para desarrollo, habilitar en producción si usas sesiones).
- **Autenticación**: Actualmente, todos los endpoints `/api/**` y `/qr_codes/**` son públicos.  
  **Mejora recomendada:** Implementar autenticación JWT para endpoints sensibles.

---

## 🛠️ Mejoras y Consideraciones Técnicas

- **Sincroniza interfaces y adaptadores:** Asegúrate de que todos los métodos implementados estén en las interfaces.
- **Centraliza validaciones y manejo de errores:** Usa `@ControllerAdvice` para respuestas uniformes.
- **Limpia imports y métodos no usados.**
- **Agrega pruebas unitarias y de integración.**
- **Documenta la API con Swagger/OpenAPI.**
- **Revisa las relaciones JPA:** Usa `cascade = CascadeType.ALL, orphanRemoval = true` si quieres eliminar en cascada.
- **Evita validaciones duplicadas** (en entidades y casos de uso).
- **Manejo de fechas:** Considera inyectar un servicio de tiempo para facilitar pruebas.
- **Excepciones personalizadas:** Usa excepciones específicas para errores de negocio.

---

## 📚 Documentación de la API

Si tienes Swagger configurado, accede a:  
[http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)

---

## 🚩 Advertencias y Limitaciones

- **No uses CSRF deshabilitado en producción.**
- **No expongas endpoints públicos sin autenticación si manejas datos sensibles.**
- **Revisa los constraints y nombres de columnas en tus entidades JPA.**
- **Asegúrate de que los métodos de locking (`findByIdWithLock`) estén implementados en los repositorios.**

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas!

1. Haz un fork del repositorio.
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y commitea: `git commit -m 'Añadir funcionalidad'`
4. Sube tus cambios: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## ✉️ Contacto

¿Dudas o sugerencias?  
Abre un issue o contacta a [nikolasg12000@gmail.com]