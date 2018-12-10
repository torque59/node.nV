# node.nV
Intentionally Vulnerable node.js application


Deploy Instructions:
1. Configure Docker
    `sudo docker network create nodenvNetwork`
    `docker pull mongo`
    `docker run --network nodenvNetwork --name nodenvMongo  -d mongo:3.2-jessie`
    `docker build -t nodenv .`
    `docker run --network nodenvNetwork -it -p 49160:8081 -t -d nodenv`
2. Access the app: http://localhost:49160
