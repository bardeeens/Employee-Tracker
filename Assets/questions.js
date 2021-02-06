const mysql = require('mysql');
const inquirer = require("inquirer")
const {deepQuestions} = require("./deepQuestions.js")
const {allEmployees} = require("../organizationDB")
function init(){

    
    // call functions based on response
//     .then((response) => {
//         switch (response.menu) {
//             case "View all Employees":
//                 allEmployees();
//                 break;
//             case "View all Employees by Department":
//                 viewEmployeesByDept();
//                 break;
//             case "View all Employees by Manager":
//                 viewEmployeesByManager();
//                 break;
//             case "Add Employee":
//                 addEmployee();
//                 break;
//             case "Remove Employee":
//                 removeEmployee();
//                 break;
//             case "Update Employee Role":
//                 console.log("promotion");
//                 break;
//             case "Update Employee Manager":
//                 console.log("new boss");
//                 break;
//             default:
//                 break;
//         }
//     }
    
//   );



    
      




}

module.exports = {init}