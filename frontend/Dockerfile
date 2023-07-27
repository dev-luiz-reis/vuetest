FROM node:14.16.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["/bin/sh", "/var/www/html/entrypoint.sh"]
