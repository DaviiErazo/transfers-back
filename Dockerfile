FROM node:12.18.4

WORKDIR /usr/src/transfers

RUN apt-get update && apt-get install -y netcat

ENV path /usr/src/transfers/node_modules/.bin:$PATH

COPY . /usr/src/transfers

RUN npm i -g dotenv-cli
RUN npm i

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]