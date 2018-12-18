# node.nV
Intentionally Vulnerable node.js application


Deploy Instructions:
1. Configure Docker
    - `sudo docker network create nodenvNetwork`
    - `docker pull mongo`
    - `docker run --network nodenvNetwork --name nodenvMongo  -d mongo:3.2-jessie`
    - `docker build -t nodenv .`
    - `docker run --network nodenvNetwork -it -p 49160:8081 -t -v ``pwd``:/usr/src/app -d nodenv`
    - `docker pull mysql`
    - `docker run --network nodenvNetwork --name nodemysql -e MYSQL_ROOT_PASSWORD=nodesecurity -d mysql:5.7`
2. Access the app: http://localhost:49160
