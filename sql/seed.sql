USE employeeDatabaseTracker;

INSERT INTO department (`name`) VALUES ("Grey");
INSERT INTO department (`name`) VALUES ("Hero");
INSERT INTO department (`name`) VALUES ("Villan");

INSERT INTO role (title, salary, department_id) VALUES ("Gryphindor", 312, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Hufflepuff", 120, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Ravenclaw", 300, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Sytherin", 472, 1); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Harry", "Potter", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Hermione", "Granger", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ron", "Weasley", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Draco", "Malfoy", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Severus", "Snape", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Riddle", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cedric", "Diggory", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Albus", "Dumbledore", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Neville", "Longbottom", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Luna", "Lovegood", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Hannah", "Abbott", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cho", "Chang", 2, 3);
