USE employeeDB;
--departments
INSERT INTO department (`name`)
VALUES ("Grey");
INSERT INTO department (`name`)
VALUES ("Hero");
INSERT INTO department (`name`)
VALUES ("Villan");
INSERT INTO department (`name`)
VALUES ("Muggle");
--roles
INSERT INTO role (title, salary, department_id)
VALUES ("Gryffindor", 312, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Hufflepuff", 120, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Ravenclaw", 300, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Slytherin", 472, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("NA", 0, 5);
--employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hermione", "Granger", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Weasley", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Draco", "Malfoy", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Severus", "Snape", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Riddle", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cedric", "Diggory", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Albus", "Dumbledore", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Neville", "Longbottom", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luna", "Lovegood", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hannah", "Abbott", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cho", "Chang", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dudley", "Dursley", 3, 4);