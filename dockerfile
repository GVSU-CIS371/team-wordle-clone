FROM node:lts-alpine as build-stage
WORKDIR /app
ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]