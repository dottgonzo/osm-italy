FROM node:16-alpine
CMD node main
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm i --production
COPY ./main.js ./
