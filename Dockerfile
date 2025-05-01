#Imagen base con Node.js
FROM node:18-alpine

#Directorio de trabajo dentro del contenedor
WORKDIR /app

#Par copiar los archivos necesarios
COPY package*.json ./

#Instala dependencias
RUN npm install

#Copia el resto del código
COPY . .

#Expone el puerto (se coloca el que se va a usar en el backend en este caso el 3000, pero puede ser otro)
EXPOSE 3000

#Pa iniciar el backend
CMD ["npm", "run", "dev"]
