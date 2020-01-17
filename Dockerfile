FROM node:10-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm install typescript -g
RUN tsc

EXPOSE 3000

CMD ["npm", "run" , "start"]
