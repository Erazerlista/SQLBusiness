const mysql = require('mysql2');
const inquirer = require("inquirer");
const consoleTables = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "CatTounge1!985",
    database: "employeeDB"
});

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error occurred:', err);
                reject(err);
            }
            resolve(results);
        });
    });
}

// Function to execute all seed queries
async function runSeedQueries() {
    try {
        console.log('Connected to the database.');
        console.log('...running SQL seed...');

        // Seed queries for department, role, and employee

        console.log('...completed');
    } catch (err) {
        console.error('Error occurred:', err);
    } finally {
    }
}

// Call the function to execute seed queries
runSeedQueries();

// Command-line interface function
function runCLI() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add data',
                    'View total utilized budget of a department',
                    'Exit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add data':
                    addData();
                    break;
                case 'View total utilized budget of a department':
                    viewDepartmentBudget();
                    break;
                case 'Exit':
                    connection.end(); // Close the connection when the user chooses to exit
                    console.log('Goodbye!');
                    break;
                default:
                    console.log('Invalid choice.');
                    runCLI();
            }
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end(); // Close the connection if any error occurs
        });
}


// Functions: viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, viewDepartmentBudget). 

//Function to view all departments
function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    executeQuery(query)
        .then((results) => {
            console.table(results);
            runCLI();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}

function viewDepartmentBudget() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID to view the total utilized budget:',
            },
        ])
        .then((answers) => {
            const departmentId = parseInt(answers.departmentId);

            // Query to calculate the total utilized budget for the department
            const query = `
                SELECT department_id, SUM(salary) AS total_budget
                FROM employee
                INNER JOIN role ON employee.role_id = role.id
                WHERE department_id = ${departmentId}
            `;

            // Execute the query
            executeQuery(query)
                .then((results) => {
                    if (results.length === 0) {
                        console.log('Department not found or has no employees.');
                    } else {
                        console.table(results);
                    }
                    runCLI();
                })
                .catch((error) => {
                    console.error('Error occurred:', error);
                    connection.end();
                });
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}

// Function to view all roles
function viewAllRoles() {
    const query = 'SELECT * FROM role';
    executeQuery(query)
        .then((results) => {
            console.table(results);
            runCLI();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}

// Function to view all employees
function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
    executeQuery(query)
        .then((results) => {
            console.table(results);
            runCLI();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}

// Function to add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
            },
        ])
        .then((answers) => {
            const departmentName = answers.departmentName;
            const insertQuery = `INSERT INTO department (name) VALUES ("${departmentName}")`;
            return executeQuery(insertQuery);
        })
        .then(() => {
            console.log('Department added successfully!');
            runCLI();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}

// Function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary for the role:',
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID for the role:',
            },
        ])
        .then((answers) => {
            const roleTitle = answers.roleTitle;
            const roleSalary = parseFloat(answers.roleSalary); 
            const departmentId = parseInt(answers.departmentId); 

            const insertQuery = `
                INSERT INTO role (title, salary, department_id) 
                VALUES ("${roleTitle}", ${roleSalary}, ${departmentId})
            `;

            return executeQuery(insertQuery);
        })
        .then(() => {
            console.log('Role added successfully!');
            runCLI();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}

// Function to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the role ID for the employee:',
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID for the employee (leave empty if none):',
            },
        ])
        .then((answers) => {
            const firstName = answers.firstName;
            const lastName = answers.lastName;
            const roleId = parseInt(answers.roleId); 
            const managerId = answers.managerId.trim() === '' ? null : parseInt(answers.managerId); // Convert managerId to a number or set to null if empty

            const insertQuery = `
                INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})
            `;

            return executeQuery(insertQuery);
        })
        .then(() => {
            console.log('Employee added successfully!');
            runCLI();
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}

// Start the application by calling runCLI
runCLI();
