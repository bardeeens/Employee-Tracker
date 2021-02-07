const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'seed',
});

connection.connect((err) => {
  if (err) throw err;
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
    .then((response) => {
      switch (response.menu) {
        case "View all Employees":
          allEmployees(init);
          // still manager and department
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
          // complete
          break;
        case "Remove Employee":
          // complete
          removeEmployee(init);
          break;
        case "Add New Role":
          addRole(init);
          break;
        case "Add New Department":
          addDept(init);
          break;
        case "Update Employee Role":
          updateEmpRole(init);
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
  connection.query('select first_name, last_name, title, salary from employee JOIN role on role_id = role.id;', function (error, results) {
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
            .then((response) => {
              let id = managerIdArray[managerArray.indexOf(response.manager)];
              connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('${firstName}', '${lastName}', ${titleid+1}, ${id});`, function (error, results, fields) {
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
      let employee = (results[i].first_name + " " + results[i].last_name)
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
      .then((response) => {
        console.log(response.employee);
        let dex = employeeArray.indexOf(response.employee)
        
        connection.query(`DELETE FROM employee WHERE id=${empIdArray[dex]}`, function (error) {
          if (error) throw error;
          console.log(`${response.employee} has been fired!`);
          cb();
        })
      })
  })
}
let addDept = (cb) => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the name of the new department?",
        name: "dept"
      }
    ])
    .then((response) => {
      connection.query(`INSERT INTO department (name) values ('${response.dept}');`, function (error) {
        if (error) throw error;
        console.log(`${response.dept} has been added as a new department!`);
        cb();
      })
    })
}
let addRole = (cb) => {
  connection.query(`SELECT * FROM department`, function (error, results) {
    if (error) throw error;
    let deptArray = []
    for (let i = 0; i < results.length; i++) {
      deptArray.push(results[i].name)

    }
    inquirer
      .prompt([
        {
          type: 'input',
          message: "What is the title of this role?",
          name: 'title'
        },
        {
          type: 'list',
          message: 'What department is this position in?',
          name: 'dept',
          choices: deptArray
        },
        {
          type: 'input',
          message: "What is the salary of this position?",
          name: 'salary'
        }
      ])
      .then((response) => {
        for (let i = 0; i < deptArray.length; i++) {
          if (response.dept === deptArray[i]) {
        connection.query(`INSERT INTO role (title, salary, department_id) values ('${response.title}','${response.salary}','${i+1}');`, function (error, results) {
    if (error) throw error;
    console.log(`${response.title} has been added!`);

    cb();
        
  })
      }  
      }
  })


})}
let updateEmpRole = (cb) => {
  connection.query(`select id, first_name, last_name from employee;`, function (error, results) {
    if (error) throw error;
    let employeeArray = [];
    let empIdArray = [];
    
    for (let i = 0; i < results.length; i++) {
      let employee = (results[i].first_name + " " + results[i].last_name)
      let empID = results[i].id
      employeeArray.push(employee);
      empIdArray.push(empID);
    }
    console.log(empIdArray);
    console.log(employeeArray);
    inquirer
    .prompt([
      {
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: employeeArray,
        name: 'employee'
      }
    ])
    .then((response) => {
      let dex = employeeArray.indexOf(response.employee)
    let empId = empIdArray[dex]
    connection.query(`SELECT title, id FROM role`, function (error, results) {
        if (error) throw error;
        let roleArray = []
        let roleIDArray = []
        for (let i = 0; i < results.length; i++) {
         let roletitle = results[i].title
         let roleid = results[i].id
          roleArray.push(roletitle);
          roleIDArray.push(roleid)
        }
        console.log(roleArray);
        console.log(roleIDArray);
        inquirer
          .prompt([{
            type: 'list',
            message: `What is ${response.employee}'s new role?`,
            choices: roleArray,
            name: 'role'
          }])
          .then((res)=> {
            let dexid = roleArray.indexOf(res.role)
            let roleid = roleIDArray[dexid]


            connection.query(`UPDATE employee SET role_id=${roleid} WHERE id=${empId}`, function (error, results) {
    if (error) throw error;
    console.log(`${response.employee}'s role has been successfuly updated to ${res.role}`);
    cb();
  })
          })
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

// .then((response) => {
//   console.log(response.employee);
//   let dex = employeeArray.indexOf(response.employee)
//   connection.query(`select id, first_name, last_name from employee;`, function (error, results) {
// if (error) throw error;
// let empIdArray = [];


// cb();
// })
// })

// 

// connection.query('SELECT * FROM department', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
//   connection.end();
// });
// for (let i = 0; i < results.length; i++) {
//   let employee = (results[i].first_name + " " + results[i].last_name)
//   let empID = results[i].id
//   employeeArray.push(employee);
//   empIdArray.push(empID);
//   if (response.employee === employee){
//     connection.query(`UPDATE employee SET role_id = ${}, WHERE id=${empIdArray[i]}`, function (error, results) {
//       if (error) throw error;
//       console.log(`${response.employee} has been fired!`);
//       cb();
//     })
    
//   }

// }



module.exports = {
  allEmployees
};