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
- Bcrypt para hashing de contraseñas

---

## Instalación

```bash
git clone https://github.com/JayEich/Historial-Clinico.git
cd Historial-Clinico
npm install
cp .env.example .env
```

---

## ⚙️ Uso

1. Hay que tener PostgreSQL corriendo y una base de datos creada(el sql tiene el sql CODE).
2. Configura el archivo `.env` con los datos reales.
3. Corre el servidor:

```bash
npm run dev
```

---

## Pruebas con Postman

Este proyecto incluye una colección Postman lista para importar y probar los endpoints disponibles.

### ▶ 1. Importar la colección

1. Abre [Postman](https://www.postman.com/)
2. Haz clic en **“Import”**
3. Selecciona el archivo `Historial_Clinico_Postman_Collection.json` incluido en este repositorio
4. Se importará como **“Historial Clínico API”**

---

###  2. Flujo de uso

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
Y en cada endpoint que solicite un id "/:id" se debe hacer el cambio por el uuid real del historial
 


## 📁 Estructura del proyecto

```
src/
├── controllers/
├── routes/
├── entities/
├── config/
├── dto/
├── middlewares/
└── app.ts
```

---

## 📄 Licencia

MIT
