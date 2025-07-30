# Etapa de construcción
FROM node:lts-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa de ejecución
FROM node:lts-alpine AS runtime

WORKDIR /app
COPY --from=build /app/dist /app

EXPOSE 4321
CMD ["npx", "serve", "-s", ".", "-l", "4321"]
