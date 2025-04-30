FROM node:20-alpine

# 1) Instala curl para el healthcheck
RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) Copia el resto de tu código
COPY . .

# 3) Expón el puerto y comando de arranque
EXPOSE 5000
CMD ["npm", "start"]
