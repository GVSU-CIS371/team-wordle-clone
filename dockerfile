FROM node:lts-alpine as build-stage
WORKDIR /app
ENV PORT 8080
ENV HOST 0.0.0.0
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_projectId
ARG VITE_storageBucket
ARG VITE_messagingSenderId
ARG VITE_appId
ARG VITE_measurementId
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_projectId=$VITE_projectId
ENV VITE_storageBucket=$VITE_storageBucket
ENV VITE_messagingSenderId=$VITE_messagingSenderId
ENV VITE_appId=$VITE_appId
ENV VITE_measurementId=$VITE_measurementId
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]