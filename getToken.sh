#!/bin/bash
curl -H "Content-Type:application/json" -X POST -d '{"username":"testuser1","password":"abc123!!"}' http://localhost:8080/api/authenticate