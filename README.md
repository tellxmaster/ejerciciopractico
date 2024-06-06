Aquí tienes la documentación en Markdown para reconstruir el proyecto utilizando React y Spring:

## Documentación para Reconstruir el Proyecto

### Prerrequisitos

Asegúrate de tener las siguientes herramientas:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Java JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Maven](https://maven.apache.org/)
- [Git](https://git-scm.com/)
- [IDE para Java (por ejemplo, IntelliJ IDEA, Eclipse)](https://www.jetbrains.com/idea/download/)
- [IDE para JavaScript (por ejemplo, Visual Studio Code)](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/get-started/)

### Clonación del Repositorio

Primero, clonar el repositorio del proyecto desde GitHub.

```bash
git clone https://github.com/tellxmaster/ejerciciopractico.git
cd ejerciciopractico
```

### Configuración Contenedor Base de Datos

1. **Ejecutar el contenedor de SQL Server**:

   - Para correr el proyecto es necesario tener Docker instalado o una instancia de SQLServer

     ```bash
     docker build -t sqlserver .
     ```

   - Una vez que la imagen se haya construido correctamente, ejecuta el siguiente comando para iniciar el contenedor:

     ```bash
     docker run -d -p 1433:1433 --name sqlserver-container sqlserver-container
     ```

   - Esto creará y ejecutará un contenedor de SQL Server en tu máquina local, mapeando el puerto 1433 del contenedor al puerto 1433.

   > Nota: Es necesario crear una base de datos llamada `storedb` en tu instancia de SQL Server. Puedes utilizar la herramienta de administración de SQL Server de tu preferencia para crear la base de datos.

### Configuración del Backend (Spring Boot)

1. **Importar el proyecto en tu IDE de Java**:

   - Abre tu IDE de Java (IntelliJ IDEA, Eclipse, etc.).
   - Importa el proyecto como un proyecto de Maven existente.

2. **Configuración del archivo `application.properties`**:

   - Navega a `src/main/resources/application.properties`.
   - Configura las propiedades necesarias para tu entorno (por ejemplo, la configuración de la base de datos).

   ```properties
    spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=storedb;encrypt=true;trustServerCertificate=true
    spring.datasource.username=SA
    spring.datasource.password=<Password-Configurado>
    spring.jpa.hibernate.ddl-auto=create-drop
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.format_sql=true
   ```

3. **Compilar y ejecutar el backend**:

   - Ejecuta el siguiente comando para compilar el proyecto:

     ```bash
     mvn clean install
     ```

   - Ejecuta la aplicación Spring Boot:

     ```bash
     mvn spring-boot:run
     ```

### Configuración del Frontend (React)

1. **Instalar dependencias del proyecto**:

   - Navega a la carpeta del proyecto frontend:

     ```bash
     cd frontend
     ```

   - Instala las dependencias utilizando npm:

     ```bash
     npm install
     ```

2. **Configurar variables de entorno**:

   - Crea un archivo `.env` en la raíz del proyecto frontend y agrega la URL del backend:

     ```env
     REACT_APP_API_URL=http://localhost:8080/api
     ```

3. **Ejecutar la aplicación React**:

   - Inicia la aplicación React:

     ```bash
     npm start
     ```
