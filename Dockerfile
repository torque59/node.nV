# Warning:
#   This app expects both a mongodb and mysql server container to be running on the same network
FROM node:8
WORKDIR /usr/src

COPY package*.json ./

# Setup mongo client
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN touch /etc/apt/sources.list.d/mongodb-enterprise.list
RUN echo "deb [ arch=amd64 ] http://repo.mongodb.com/apt/ubuntu trusty/mongodb-enterprise/4.0 multiverse" >> /etc/apt/sources.list.d/mongodb-enterprise.list
RUN apt-get update
RUN apt-get install -y mongodb

#RUN npm install -g express
RUN npm install
RUN npm install -g grunt-cli 

COPY . .
EXPOSE 8081

#RUN grunt setup