FROM node:16.13.1

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

RUN npm install typescript@4.3.* -g

COPY . .

RUN tsc

RUN npm install pm2 -g

CMD ["pm2-runtime","--raw","build/server.js","--name=svg_to_png","--no-daemon"]