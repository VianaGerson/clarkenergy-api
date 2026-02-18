FROM node:22-alpine

WORKDIR /app

# Instala o Nest CLI dentro do container para garantir comandos de build
RUN yarn global add @nestjs/cli

COPY package*.json ./
RUN yarn install

COPY . .

# Faz o build do projeto (converte TS para a pasta /dist)
RUN yarn run build

EXPOSE 3000

# Em desenvolvimento, usamos o modo watch
CMD ["yarn", "run", "start:dev"]