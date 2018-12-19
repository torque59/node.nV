CREATE DATABASE IF NOT EXISTS nodesecurity;
USE nodesecurity;

CREATE TABLE analytics (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_agent VARCHAR(1024) NOT NULL,
    ip_address VARCHAR(265) NOT NULL,
    page_name VARCHAR(1024) NOT NULL,
    reg_date TIMESTAMP
);

INSERT INTO 
    analytics (user_agent, ip_address, page_name, reg_date) 
    VALUES 
    ('firefox', '127.0.0.1', '/home/test', NOW());