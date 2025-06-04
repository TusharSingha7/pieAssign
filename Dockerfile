
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma db push
RUN npx tsc -b

EXPOSE 3000

CMD [ "node" , "dist/index.js" ]




