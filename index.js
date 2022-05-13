require('console.table')
const mysql = require('mysql2');
const inquirer = require('inquirer');



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// creating a connection to the database //
const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3344,
      user: 'root',
      password: 'abc1997',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  // make sure to throw connection error before starting inquirer //
  db.connect(err => {
      if (err) throw err;
      // calling the callQuestions function to prompt the user //
      callQuestions();
  });
// creating the array of questions that the inquirer package will use //
  const questions = {
      viewDept: 'View all departments.',
      viewRole: 'View all roles.',
      viewEmply: 'View all employees.',
      addDept: 'Add a department.',
      addRole: 'Add a role.',
      addEmply: 'Add an employee.',
      updateEmply: 'Update an employee role.'
  };



