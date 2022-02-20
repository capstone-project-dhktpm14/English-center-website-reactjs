FROM node:16 as build-step

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install --force

ARG REACT_APP_JAVA_API_URL
ENV REACT_APP_JAVA_API_URL=$REACT_APP_JAVA_API_URL


COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build-step /app/build /usr/share/nginx/html