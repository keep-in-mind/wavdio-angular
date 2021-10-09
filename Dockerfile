#
# Build Angular app
#

FROM node:16 AS build-angular

WORKDIR /usr/src/wavdio-angular/

COPY package.json package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

#
# Build Docker image
#

FROM nginx:1

COPY nginx.conf /etc/nginx/

COPY --from=build-angular /usr/src/wavdio-angular/dist/ /usr/share/nginx/html/
