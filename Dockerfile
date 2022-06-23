FROM node:latest

RUN npm install -g nodemon typescript tsc ts-node

WORKDIR /enterprise

COPY package.json .

RUN npm install

COPY . .

RUN npm run register

EXPOSE 8080

CMD ["npm", "run", "build"]