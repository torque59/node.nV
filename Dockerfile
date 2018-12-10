# Prior to running this, pull mongo
#   sudo docker network create nodenvNetwork
#   docker pull mongo
#   docker run --network nodenvNetwork --name nodenvMongo  -d mongo:3.2-jessie
#   docker build -t nodenv .
#   docker run --network nodenvNetwork -it --link some-mongo:mongo -p 49160:8081 -t -d nodenv

FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN touch /etc/apt/sources.list.d/mongodb-enterprise.list
RUN echo "deb [ arch=amd64 ] http://repo.mongodb.com/apt/ubuntu trusty/mongodb-enterprise/4.0 multiverse" >> /etc/apt/sources.list.d/mongodb-enterprise.list
RUN apt-get update
RUN apt-get install -y mongodb

RUN npm install
RUN npm install -g grunt-cli 

COPY . .
EXPOSE 8081

CMD [ "grunt", "setup"]
CMD [ "node", "server.js" ]