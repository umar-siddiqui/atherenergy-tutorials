FROM node:12

ENV NODE_ENV=production
ENV SAILS_ROOT /var/www/app

WORKDIR /var/www/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1334

CMD [ "npm", "run", "start" ]
