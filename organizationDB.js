const mysql = require('mysql');

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
  database: 'ice_creamDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
  
});

connection.end();