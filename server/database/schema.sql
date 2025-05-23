CREATE TABLE IF NOT EXISTS role (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
label VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS country (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
label VARCHAR(150) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
hash_password VARCHAR(255) NOT NULL,
avatar VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
country_id INTEGER NOT NULL,
FOREIGN KEY (country_id) REFERENCES country(id),
role_id INTEGER NOT NULL DEFAULT 1,
FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS decision (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(255) NOT NULL,
min_date DATE NOT NULL,
max_date DATE NOT NULL,
description TEXT NOT NULL,
context TEXT NOT NULL,
profit TEXT NOT NULL,
risk TEXT NOT NULL,
step VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
country_id INTEGER NOT NULL,
FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE IF NOT EXISTS category (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
label VARCHAR(50) NOT NULL,
color VARCHAR(25) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS decision_category (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
category_id INTEGER NOT NULL,
FOREIGN KEY (category_id) REFERENCES category(id),
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS comment (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
content TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id)
);

CREATE TABLE IF NOT EXISTS vote (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
state BOOLEAN,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id)
);

CREATE TABLE IF NOT EXISTS user_decision (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
role VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id)
);


INSERT INTO role (id,label) VALUES (1, 'applicant'), (2, 'user'), (3, 'administrator'), (4, 'rejected');
INSERT INTO country (id,label) VALUES (1, 'France'), (2, 'Mexique'), (3, 'Canada'), (4, 'Pérou'), (5, 'Sénégal'), (6, 'Philippines'), (7, 'Liban'), (8, 'Cote d''Ivoire'), (9, 'Australie'), (10, 'Ukraine');

INSERT INTO user (firstname,lastname,email,hash_password,avatar,country_id,role_id) 
VALUES
('laure', 'dinateur', 'alice@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/women/26.jpg', 1, 2),
('eli', 'minet', 'bob@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/men/26.jpg', 2, 2),
('rémi', 'fasol', 'charlie@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/men/23.jpg', 3, 1),
('jean', 'peuplu', 'david@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/men/26.jpg', 1, 1),
('milène', 'micoton', 'emmal@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/women/25.jpg', 2, 2),
('sacha', 'touille', 'alice.dupont@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/women/98.jpg', 1, 2),
('justin', 'ptipeu', 'bob.martin@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/men/3.jpg', 2, 2),
('josé', 'paldir', 'charlie.durand@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/men/53.jpg', 3, 1),
('paul', 'ochon', 'david.lemoine@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/men/96.jpg', 1, 1),
('agathe', 'afeeling', 'emma.morel@example.com', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/women/5.jpg', 2, 2),
('amandine', 'didine', 'amandine@a.fr', '$2y$10$abcdefghijklmnopqrstuv', 'https://randomuser.me/api/portraits/women/11.jpg', 2, 3);