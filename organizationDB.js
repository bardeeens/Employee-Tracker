const mysql = require('mysql');
const inquirer = require('inquirer');
const { inherits } = require('util');
// const { init } = require('./Assets/questions');
const { deepQuestions } = require("./Assets/deepQuestions.js")



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
function init() {

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ["View all Employees", "View all Employees by Department",
          "View all Employees by Manager", "Add Employee", "Remove Employee",
          "Add New Role", "Add New Department",
          "Update Employee Role", "Update Employee Manager"]
      },
    ])
    // call functions based on response
    .then((response) => {
      switch (response.menu) {
        case "View all Employees":
          allEmployees(init);
          // still needs more info but good
          break;
        case "View all Employees by Department":
          employeesByDept(init);
          // basically good, more info
          break;
        case "View all Employees by Manager":
          employeesByManager(init);
          break;
        case "Add Employee":
          addEmployee(init);
          break;
        case "Remove Employee":
          removeEmployee(init);
          break;
        case "Add New Role":
          console.log("we are hiring");
          break;
        case "Add New Department":
          console.log("new department");
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
  connection.query('SELECT first_name, last_name FROM employee', function (error, results) {
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
          if (response.menu === deptArray[i]) {
            connection.query(`select first_name, last_name from employee JOIN role on role_id = role.id JOIN department on role.department_id = department.id WHERE department.id =${i + 1};`, function (error, results) {
              if (error) throw error;
              console.table(results);
              cb();
            });
          }

        }
      })
  });

}
let employeesByManager = (cb) => {
  connection.query('select first_name, last_name, id from employee where role_id = 1;', function (error, results) {
    if (error) throw error;
    let managerArray = [];
    let managerIdArray = [];
    for (let i = 0; i < results.length; i++) {
      let manager = (results[i].first_name + " " + results[i].last_name)
      let managerId = (results[i].id)
      managerIdArray.push(managerId)
      managerArray.push(manager)

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
        // console.log(response.menu);
        for (let i = 0; i < managerArray.length; i++) {
          if (response.menu === managerArray[i]) {

            connection.query(`select first_name, last_name from employee
          WHERE manager_id = ${managerIdArray[i]};`, function (error, results) {
              if (error) throw error;
              console.table(results)
              // broken come back later!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
              cb();
            })
          }

        }
      })
  });
}
let addEmployee = (cb) => {
  connection.query(`select title, role.id from role;`, function (error, results) {
    if (error) throw error;
    let titleArray = [];
    let idArray = [];
    for (let i = 0; i < results.length; i++) {
      titleArray.push(results[i].title)
      idArray.push(results[i].id)
    }
    inquirer
      .prompt([
        {
          type: 'list',
          message: "What is the role of the new employee?",
          name: 'role',
          choices: titleArray
        },
        {
          type: 'input',
          message: "What is their first name?",
          name: 'firstname'
        },
        {
          type: 'input',
          message: "What is their last name?",
          name: 'lastname'
        }
      ])
      .then((response) => {
        let firstName = response.firstname;
        let lastName = response.lastname;
        let titleid = titleArray.indexOf(response.role)
        // idArray[titleid]
        connection.query(`select first_name, last_name, employee.id from employee
        WHERE role_id=1;`, function (error, results) {
    if (error) throw error;
    let managerArray = [];
    let managerIdArray = [];
    for (let i = 0; i < results.length; i++) {
      let manager = (results[i].first_name + " " + results[i].last_name)
      let managerId = (results[i].id)
      managerIdArray.push(managerId)
      managerArray.push(manager)

    }
    inquirer
    .prompt([
      {
        type: 'list',
        message: "Who will they report to?",
        name: 'manager',
        choices: managerArray
      }
    ])
    .then((response)=>{
    let id = managerIdArray[managerArray.indexOf(response.manager)];
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('${firstName}', '${lastName}', ${titleid}, ${id});`, function (error, results, fields) {
        if (error) throw error;
        cb();
      })
    })
  })

        


        // let manager = response.manager;
      })
    // cb();
  })

}
let removeEmployee = (cb) => {
  connection.query(`select id, first_name, last_name from employee;`, function (error, results) {
    if (error) throw error;
    let employeeArray = [];
    let empIdArray = [];
    for (let i = 0; i < results.length; i++) {
      let employee= (results[i].first_name + " " + results[i].last_name)
      let empID = results[i].id
      employeeArray.push(employee);
      empIdArray.push(empID);
      
    }
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'Which employee would you like to remove?',
          choices: employeeArray,
          name: 'employee'
        }
      ])
      .then((response)=> {
        console.log(response.employee);
        let dex = employeeArray.indexOf(response.employee)
        console.log();
        connection.query(`DELETE FROM employee WHERE id=${empIdArray[dex]}`, function (error, results) {
    if (error) throw error;
    console.log(`${response.employee} has been fired!`);
    cb();
  })
      })
  })
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

