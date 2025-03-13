# Stage 1: Build the app
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 8000

CMD ["node", "dist/index.js"]
