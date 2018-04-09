FROM node:9.11

WORKDIR /app

RUN npm i -g @angular/cli --unsafe

COPY FE/package.json package.json

RUN npm install

COPY ./FE/ .

RUN ng build --prod --build-optimizer
