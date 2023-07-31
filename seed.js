// Dependencies
var mysql = require('mysql');
var inquirer = require("inquirer");
const consoleTables = require("console.table");
var managers = [];
var roles = [];
var Employees = [];

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
            // CLI function to start the application
            runCLI();
        }
    });
});

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
                    'Update an employee role',
                    'Exit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                // ... (other cases)
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
