DROP TABLE IF EXISTS owner CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS completed CASCADE;

CREATE TABLE owner (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  project VARCHAR(255),
  client VARCHAR(255),
  creation_date DATE,
  creation_time TIME,
  description VARCHAR(255),
  dead_line VARCHAR(255),
  task_owner INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE completed (
  id SERIAL PRIMARY KEY,
  project VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  completion_date DATE,
  completion_time TIME,
  description VARCHAR(255) NOT NULL,
  dead_line VARCHAR(255) NOT NULL,
  task_owner INTEGER REFERENCES users(id) ON DELETE CASCADE
);
