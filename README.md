# node.nV
Intentionally Vulnerable node.js application


Deploy Instructions:
1. Install the app with docker-compose: `docker-compose up -d --build --force-recreate`
2. Seed the database: `docker-compose exec nodenv /bin/bash ./init/seed.sh`
3. Access the app: http://localhost:49160
