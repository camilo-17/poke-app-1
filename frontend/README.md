# Proyecto Fullstack - Instrucciones de Ejecución

Este proyecto consta de dos partes: un **frontend** hecho en Angular y un **backend** desarrollado con Node.js. Sigue las instrucciones a continuación para ejecutar ambas partes correctamente.

## Requisitos Previos

Asegúrate de tener instalado en tu sistema:

-   Node.js
-   npm (Node Package Manager)

## Pasos para ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/usuario/proyecto.git
cd proyecto
```

### 2. Instalar dependencias del **frontend**

1. Cambia al directorio del frontend:

    ```bash
    cd frontend
    ```

2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

### 3. Instalar dependencias del **backend**

1. Abre una nueva terminal y navega al directorio del backend:

    ```bash
    cd backend
    ```

2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

### 4. Configuración de variables de entorno

#### Backend

1. Crea un archivo `.env` en el directorio `backend`.
2. Agrega las siguientes variables de entorno al archivo `.env`:

    ```env
    DB_PASSWORD=""
    POKEMON_API_KEY=""
    STRIPE_PRIVATE_KEY=""
    CLIENT_SECRET_AUTH=""
    DB_HOST=""
    DB_USER=""
    DB_PASSWORD=""
    DB_NAME=""
    ```

#### Frontend (Angular)

1. Abre el archivo `src/environments/environment.ts` en el directorio `frontend`.
2. Asegúrate de agregar las variables necesarias, por ejemplo:

    ```typescript
    export const environment = {
        publicApiStripe: 'your_stripe_public_key',
        authAppId: 'your_auth_app_id',
        authApiUrl: 'your_auth_api_url',
        auth0: {
            domain: 'your_auth0_domain',
            clientId: 'your_auth0_clientId',
            authorizationParams: {
                redirect_uri: window.location.origin,
                audience: 'http://localhost:4200',
            },
            httpInterceptor: {
                allowedList: [`http://localhost:3000/*`],
            },
        },
    };
    ```

### 5. Ejecutar el proyecto

#### Frontend

1. En la terminal donde instalaste las dependencias del frontend, ejecuta:

    ```bash
    npm run start
    ```

    Esto iniciará el servidor de desarrollo de Angular.

#### Backend

1. En la terminal donde instalaste las dependencias del backend, ejecuta:

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor de desarrollo del backend en modo watch.

### 6. Acceso a la aplicación

Una vez que ambos servidores están corriendo, puedes acceder a la aplicación frontend en tu navegador en:

```
http://localhost:4200
```

## Notas

-   Asegúrate de que el backend esté configurado correctamente con las bases de datos y servicios externos.
-   Revisa los logs de ambos servidores para asegurarte de que todo esté funcionando correctamente.
