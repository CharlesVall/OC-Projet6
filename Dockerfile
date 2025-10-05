FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install \
  && apk add --no-cache python3 make g++ \
  && apk del python3 make g++

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
