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
      updateEmply: 'Update an employee role.',
      quit: 'Quit.'
  };

function callQuestions() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            questions.viewDept,
            questions.viewRole,
            questions.viewEmply,
            questions.addDept,
            questions.addRole,
            questions.addEmply,
            questions.updateEmply,
            questions.quit
        ]
    }).then(answer => {
        // using switch function to find the corresponding case selected, break to end the search //
        switch (answer.action) {
            case questions.viewDept:
                viewDept();
                break;
            case questions.viewRole:
                viewRole();
                break;
            case questions.viewEmply:
                viewEmply();
                break;
            case questions.addDept:
                addDept();
                break;         
            case questions.addRole:
                addRole();
                break;
            case questions.addEmply:
                addEmply();
                break;
            case questions.updateEmply:
                updateEmply();
                break;
            }
    })
}

// now to write the functions that I called above in the inquirer answer function //
function viewDept() {}

function viewRole() {}

function viewEmply() {}

function addDept() {}

function addRole() {}

function addEmply() {}

function updateEmply() {}
