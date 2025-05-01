# 🩺 Historial Clínico - Microservicio Backend

Este proyecto es un microservicio RESTful para la gestión de historiales clínicos, desarrollado con **Node.js**, **Express**, **TypeORM** y **PostgreSQL**.

---

## Tecnologías

- Node.js + TypeScript
- Express
- PostgreSQL
- TypeORM
- JWT para autenticación
- Class-validator para validaciones
- Bcryptjs para hashing de contraseñas
- Axios para la api externa de OpenAI

---

## Instalación

```bash
git clone https://github.com/JayEich/Historial-Clinico.git
cd Historial-Clinico
npm install
cp .env.example .env
```

---

## Uso

1. Hay que tener PostgreSQL corriendo y una base de datos creada(el sql tiene el sql CODE).
2. Configura el archivo `.env` con los datos reales.
3. Corre el servidor:

```bash
npm run dev 
```
## Ejecución con la Ballienita Azul (Docker)
Asegúrate de tener Docker Desktop instalado y corriendo (abrirlo)

En la raíz del proyecto, ejecuta:
```bash
docker-compose up --build
```

La API estará disponible en:
http://localhost:3000

Esto levanta:

- Un contenedor para la base de datos PostgreSQL (db)

- Un contenedor para el backend (app)

Sin necesidad de configurar .env, todo viene desde docker-compose.yml

Puedes probar los endpoints con la colección Postman incluida(mira mas abajo).

---

## Pruebas con Postman

Este proyecto incluye una colección Postman lista para importar y probar los endpoints disponibles.

### 1. Importar la colección

1. Abre [Postman](https://www.postman.com/)
2. Haz clic en **“Import”**
3. Selecciona el archivo `/postman/Collection.json` incluido en este repositorio
4. Se importará como **“Historial Clínico API”**

---

###  2. Flujo de uso
r
#### 2.1 Registrar un nuevo usuario

- `POST /auth/register`
- Cuerpo JSON de ejemplo:

```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```

#### 2.2  Hacer login y copiar el token

- `POST /auth/login`
- Cuerpo JSON con las mismas credenciales
- Copia el valor del campo `token` en la respuesta

#### 2.3  Guardar el token en la colección

1. En Postman, haz clic en la colección “Historial Clínico API”
2. Ve a la pestaña **Variables**
3. Reemplaza el valor de la variable `token` con el JWT que obtuviste
4. Haz clic en **Save** (en cada endpoint se le debe dar el valor del token a la variable en los headers)

---

###  3 Probar endpoints protegidos

En cada endpoint se le debe dar el valor del token a la variable creada en los headers
Y en cada endpoint que solicite un id "/{{historyId}}" se debe ingresar el uuid real del historial
 
---
## Prueba con jest

Este proyecto incluye una prueba de registro con jest, se puede hacer ejecutando el proyecto con docker o en local y luego:

```bash
npm test
```

---
# Sistema de sugerencia de Diagnostico
IMPORTANTE
Este proyecto incluye un endpoint adicional que permite generar una **sugerencia de diagnóstico médico** basada en los síntomas del historial clínico del paciente.

Si se configura una clave de API de OpenAI en el archivo `.env`, el sistema utilizará la IA real para generar la sugerencia:

```
OPENAI_API_KEY=tu_clave_api
```

Ejemplo de respuesta generada por OpenAI:

```json
{
  "symptoms": "fiebre, escalofríos y dolor de garganta",
  "suggestedDiagnosis": "Podría tratarse de una faringitis viral o una infección de las vías respiratorias superiores.",
  "source": "openai"
}
```

> Si la clave no está presente o hay un error con OpenAI, se usará automáticamente el modo simulado como respaldo.
No logre probarla por el tema de la key no obstante deje el codigo bajo el que se supone deberia de funcionar con openAI
