FROM node:14.18.3-alpine

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "./server.js"]
