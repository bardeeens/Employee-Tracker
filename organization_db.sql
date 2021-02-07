drop database if exists seed;
CREATE DATABASE if not exists seed;
USE seed;

CREATE TABLE department(
id INTEGER auto_increment primary key NOT NULL,
name varchar(30) NOT NULL
);

CREATE TABLE role(
id INTEGER auto_increment primary key NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL (8,2) NOT NULL,
department_id INTEGER NOT NULL
);

CREATE TABLE employee(
id INTEGER auto_increment primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER
);

 INSERT INTO department (id, name) values (1, 'Front of House');
 INSERT INTO department (name) values ('Back of House');
 INSERT INTO role (id, title, salary, department_id) values (1, 'Manager', '110000.00', 1);
 INSERT INTO role (title, salary, department_id) values ('Front Server', '80000.00', 1);
 INSERT INTO role (title, salary, department_id) values ('Back Server', '50000.00', 1);
 INSERT INTO role (title, salary, department_id) values ('Food Runner', '35000.00', 1);
 INSERT INTO role (title, salary, department_id) values ('Head Chef', '105000.00', 2);
 INSERT INTO role (title, salary, department_id) values ('Sous Chef', '65000.00', 2);
 INSERT INTO role (title, salary, department_id) values ('Line Cook', '40000.00', 2);
 INSERT INTO employee (id, first_name, last_name, role_id) values (1, 'Derek', 'Bardini', 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Coleen', 'Pasion', 2, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Dan', 'Wiemler', 2, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Joshua', 'Hulings', 2, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Lauren', 'Kern', 2, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Danae', 'Diem', 3, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Hiro', 'Nataki', 4, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Peter', 'Ives', 1, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Tyler', 'Doyle', 6, 8);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Roger', 'Simpson', 7, 8);
 INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Bobby', 'Wasabi', 7, 8);
 
 delete from employee Where id=10
 
 select * from department;
 select title from role;
 select * from employee
 where first_name= 'bobby';
 
 select first_name, last_name, employee.id from employee
 WHERE role_id=1;
 select title, role.id from role;
 
JOIN role on role_id = role.id
JOIN department on role.department_id = department.id
WHERE department.id =2;

select first_name, last_name, id from employee
WHERE role_id = 1;

select id from department;

select * from employee;
select * from role;

inner join role
on employee.role_id = role.id;
inner join role on depart

inner join employee ON role.title = employee.role_id;
 
select first_name, last_name, title, salary
from employee
JOIN role on role_id = role.id;

select * from employee JOIN role on role_id = role.id;




 


