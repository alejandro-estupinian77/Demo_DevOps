FROM node:18-alpine

WORKDIR /app

# Copiar package.json (ahora está en raíz)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar TODO el código (ahora todo está accesible)
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]