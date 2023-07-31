// Dependencies
var mysql = require('mysql');
var inquirer = require("inquirer");
var chalk = require("chalk");

function log(msg) {
    console.log(msg);
}

log(chalk.green.bold("========================"));
log(chalk.yellow(""));
log(chalk.blue.bold('EMPLOYEE'));
log(chalk.blue.bold('MANAGEMENT'));
log(chalk.blue.bold('TRACKER'));
log(chalk.yellow(""));
log(chalk.green.bold("================"));

// Connection propertie... changed port number...
const connectionProperties = {
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "CatTounge1!985", 
    database: "employeeD"
};

// Connection
const connection = mysql.createConnection(connectionProperties);
