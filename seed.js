// Dependencies
var mysql = require('mysql');
var inquirer = require("inquirer");
const consoleTables = require("console.table");
var managers = [];
var roles = [];
var employees = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "CatTounge1!985",
    database: "employeeDatabaseTracker"
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');

    console.log("...running SQL seed...");

    connection.query(seedQuery, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("...completed");
            // Fetch initial data before starting the CLI
            fetchInitialData();
            // CLI function to start the application
            runCLI();
        }
    });
});

// Function to fetch and store managers, roles, and employees
function fetchInitialData() {
    // Fetch managers
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee WHERE manager_id IS NULL;", (err, results) => {
        if (err) throw err;
        managers = results;
    });

    // Fetch roles
    connection.query("SELECT id, title FROM role;", (err, results) => {
        if (err) throw err;
        roles = results;
    });

    // Fetch employees
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS employee FROM employee;", (err, results) => {
        if (err) throw err;
        employees = results;
    });
}

// Function to update the manager of an employee
function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select the employee whose manager you want to update:',
            choices: employees.map((employee) => ({ name: employee.employee, value: employee.id }))
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the new manager for the employee:',
            choices: managers.map((manager) => ({ name: manager.manager, value: manager.id }))
        }
    ])
    .then((answers) => {
        const { employee, manager } = answers;
        connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [manager, employee], (err) => {
            if (err) throw err;
            console.log('Employee manager updated successfully!');
            runCLI();
        });
    })
    .catch((error) => {
        console.error('Error occurred:', error);
        connection.end();
    });
}

// Function to view employees by manager
function viewEmployeesByManager() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'manager',
            message: 'Select the manager to view their employees:',
            choices: managers.map((manager) => ({ name: manager.manager, value: manager.id }))
        }
    ])
    .then((answers) => {
        const { manager } = answers;
        connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS employee FROM employee WHERE manager_id = ?', [manager], (err, results) => {
            if (err) throw err;
            console.table(results);
            runCLI();
        });
    })
    .catch((error) => {
        console.error('Error occurred:', error);
        connection.end();
    });
}

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
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee manager',
                    'View employees by manager',
                    'View employees by department',
                    'Delete department',
                    'Delete role',
                    'Delete employee',
                    'View total utilized budget of a department',
                    'Exit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    // Implement the function to view all departments
                    break;
                case 'View all roles':
                    // Implement the function to view all roles
                    break;
                case 'View all employees':
                    // Implement the function to view all employees
                    break;
                case 'Add a department':
                    // Implement the function to add a department
                    break;
                case 'Add a role':
                    // Implement the function to add a role
                    break;
                case 'Add an employee':
                    // Implement the function to add an employee
                    break;
                case 'Update an employee manager':
                    updateEmployeeManager();
                    break;
                case 'View employees by manager':
                    viewEmployeesByManager();
                    break;
                // Implement other cases for the remaining functionalities
                case 'Exit':
                    connection.end();
                    console.log('Goodbye!');
                    break;
                default:
                    console.log('Invalid choice.');
                    runCLI();
            }
        })
        .catch((error) => {
            console.error('Error occurred:', error);
            connection.end();
        });
}
