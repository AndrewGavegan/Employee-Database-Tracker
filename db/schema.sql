-- creating the database --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
-- create department table --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(40) UNIQUE NOT NULL
);
-- create the job roles table --
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) UNIQUE NOT NULL,
    salary BIGINT NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);
-- create employees table: ids, first names, last names, job titles, departments, salaries, and managers that the employees report to --
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40) UNIQUE NOT NULL,
    last_name VARCHAR(40) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);