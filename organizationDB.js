const mysql = require('mysql');
const inquirer = require('inquirer');
const { inherits } = require('util');
// const { init } = require('./Assets/questions');
const {deepQuestions}= require("./Assets/deepQuestions.js")



// Connect to the ice_creamDB database using a localhost connection
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your MySQL username
  user: 'root',

  // Your MySQL password (leave blank for class demonstration purposes; fill in later)
  password: 'root',

  // Name of database
  database: 'seed',
});

connection.connect((err) => {
  if (err) throw err;
  // x = require('connectionuser')(connection)
  init();
  
});
function init(){

  inquirer
  .prompt([
      {
          type: 'list',
          message: 'What would you like to do?',
          name: 'menu',
          choices: ["View all Employees", "View all Employees by Department", 
          "View all Employees by Manager", "Add Employee", "Remove Employee", 
      "Update Employee Role", "Update Employee Manager"]
        },
  ])
  // call functions based on response
  .then((response) => {
      switch (response.menu) {
          case "View all Employees":
              allEmployees(init);
              break;
          case "View all Employees by Department":
              employeesByDept(init);
              break;
          case "View all Employees by Manager":
              employeesByManager();
              break;
          case "Add Employee":
              addEmployee();
              break;
          case "Remove Employee":
              removeEmployee();
              break;
          case "Update Employee Role":
              console.log("promotion");
              break;
          case "Update Employee Manager":
              console.log("new boss");
              break;
          default:
              break;
      }
  }
  
);
}
let allEmployees = (cb) => {
  connection.query('SELECT * FROM employee', function (error, results) {
    if (error) throw error;
    console.table(results);
    cb();
  });
  
} 

let employeesByDept = (cb) => {
  connection.query('SELECT * FROM department', function (error, results) {
    if (error) throw error;
    let deptArray = []
    for (let i = 0; i < results.length; i++) {
      deptArray.push(results[i].name)
      
    }
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Which employees would you like to view?',
            name: 'menu',        
            choices: deptArray
          },
    ])
    .then((response) => {
      // console.log(deptArray.length);
      for (let i = 0; i < deptArray.length; i++) {
        if (response.menu === deptArray[i]){
          connection.query(`select first_name, last_name from employee JOIN role on role_id = role.id JOIN department on role.department_id = department.id WHERE department.id =${i+1};`, function (error, results) {
            if (error) throw error;
            console.table(results);
            cb();
          });
         }
        
      }
    })
  });
 
}
let employeesByManager = () => {
  connection.query('select first_name, last_name from employee where role_id = 1', function (error, results, fields) {
    if (error) throw error;
    let managerArray = []
    for (let i = 0; i < results.length; i++) {
      let manager = (results[i].first_name + " " + results[i].last_name)
      managerArray.push(manager)
      console.log(managerArray);
      
    }
    inquirer
    .prompt([
        {
            type: 'list',
            message: `Which manager would you like to view the employees of?`,
            name: 'menu',
            choices: managerArray
          },
    ])
    .then((response) => {
      console.log(response.menu);
      if (response.menu === managerArray[0]){
        displayDerekEmployees(init);
      }  
      else {
        displayPeterEmployees(init);
      }
    })
  });
}
let addEmployee = () => {
  console.log("we finna add some employees");
}
let removeEmployee = () => {
  console.log("u fired");
}

let displayFront = (cb) => {
  connection.query(`select first_name, last_name from employee
JOIN role on role_id = role.id
JOIN department on role.department_id = department.id
WHERE department.id =1;`, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    cb();
  })
}

let displayBack = (cb) => {
  connection.query(`select first_name, last_name from employee
JOIN role on role_id = role.id
JOIN department on role.department_id = department.id
WHERE department.id =2;`, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    cb();
  })
}

let displayDerekEmployees = (cb) => {
  connection.query(`select first_name, last_name from employee
  WHERE manager_id = 1;`, function (error, results, fields) {
      if (error) throw error;
      console.table(results);
      cb();
    })
}

let displayPeterEmployees = (cb) => {
  connection.query(`select first_name, last_name from employee
  WHERE manager_id = 8;`, function (error, results, fields) {
    if (error) throw error;
    console.table(results);
    cb();
  })
}



// connection.query('SELECT * FROM role', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
  
// });

// connection.query('SELECT * FROM department', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
//   connection.end();
// });

module.exports = {
  allEmployees
}

