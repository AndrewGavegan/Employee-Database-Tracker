require('console.table')
const mysql = require('mysql2');
const inquirer = require('inquirer');



// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// creating a connection to the database //
const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3306,
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
            case questions.quit:
                db.end();
                break;
            }
    })
}
// inquirer function for adding name of new depatment //
function deptName() {
    return ([
        {
            name: 'departmentName',
            type: 'input',
            message: 'What is the name of the new department?'
        }
    ]);
}
// inquirer function for adding the title and salary for new role //
function roleName() {
    return ([
        {
            name: "roleTitle",
            type: "input",
            message: "What is the title of the new role?" 
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What is the salary of this role?"
        }
    ]);
}
// inquirer function for adding name of new employees //
function emplyName() {
    return ([
        {
                name: "firstname",
                type: "input",
                message: "What is the employees first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the employees last name?"
        }
    ]);
}
// inquirer function for changing the role of an employee after requesting their id //
function emplyId() {
    return ([
        {
                name: "id",
                type: "input",
                message: "What is the employees id number?"
        }
    ]);
}
// now to write the functions that I called above in the inquirer answer function //
function viewDept() {
    // paste in code from query.sql file in template literals//
    const departments = `SELECT department.id, department.department_name
    FROM department 
    ORDER BY department.id;`;
// select all the records from department table and display the result //
    db.query(departments, (err, res) => {
        if (err) throw err;
        console.log('\n Departments Table \n')
        console.table(res);
        // call the inquirer to ask questions again //
        callQuestions();
    });
}

function viewRole() {
    // paste in code from query.sql file in template literals//
    const roles = `SELECT roles.id, roles.title AS roles, roles.salary AS  salary, department.department_name AS department
    FROM roles 
    LEFT JOIN department
    ON roles.department_id = department.id
    ORDER BY roles.id;`;
// select all the records from roles table and display the result //
    db.query(roles, (err, res) => {
        if (err) throw err;
        console.log('\n Roles Table \n')
        console.table(res);
        // call the inquirer to ask questions again //
        callQuestions();
    });
}

function viewEmply() {
     // paste in code from query.sql file in template literals//
     const employee = `
     SELECT employee.id, employee.first_name, employee.last_name, roles.title, 
     department.department_name AS department, roles.salary, 
     CONCAT(manager.first_name, ' ', manager.last_name) AS manager    
     FROM employee
     LEFT JOIN employee manager ON manager.id = employee.managers_id
     INNER JOIN roles ON roles.id = employee.role_id
     INNER JOIN department ON department.id = roles.department_id
     ORDER BY employee.id;`;
 // select all the records from employee table and display the result //
     db.query(employee, (err, res) => {
         if (err) throw err;
         console.log('\n Employee Table \n')
         console.table(res);
         // call the inquirer to ask questions again //
         callQuestions();
     });
}

async function addDept() {
    // wait for the answer to the deptName function to be received //
    const newDept = await inquirer.prompt(deptName());
    console.log('New department added!');
    // once is has been, call the query function to run mysql insert statement and insert new department into the table //
    db.query('INSERT INTO department SET ?',
        {
            department_name: newDept.departmentName
        },
        (err, res) => {
            if (err) throw err;
            // call inquirer to start again //
            callQuestions();
         });
    };

async function addRole() {
    // waiting for the answer to the roleName function so we can proceed //
    const newRole = await inquirer.prompt(roleName());
    // selecting the department table so we can add existing departments as choices into the following prompt question //
    db.query('SELECT department.id, department.department_name FROM department ORDER BY department.id', async (err, res) => {
        if (err) throw err;
        const { departments } = await inquirer.prompt([
            {
                name: 'departments',
                type: 'list',
                choices: () => res.map(res => res.department_name),
                message: 'What department is this role in?: '
            }
        ]);
        let departmentId;
        for ( const row of res) {
            // if the answer to the choices is equal to the actual id of an existing department in the table, then the new role is assigned to that table //
            if (row.department_name === departments) {
                departmentId = row.id;
                continue;
            }
        }
            console.log("New role added!");
            // using mysql INSERT statement to add the newly created role into the roles table using values acquired from awaiting the roleName answers  //
            db.query('INSERT INTO roles SET ?',
            {
                title: newRole.roleTitle,
                salary: newRole.roleSalary,
                department_id: departmentId
            },
            (err, res) => {
                if (err) throw err;
                // call inquirer to start again //
                callQuestions();
            });
        });  
    }

async function addEmply() {
        // waiting for the answer to the emplyName function so we can proceed //
    const newEmply = await inquirer.prompt(emplyName());
        // selecting the roles table so we can add existing roles as choices for the following prompt question //
    db.query('SELECT roles.id, roles.title FROM roles ORDER BY roles.id;', async (err, res) => {
        if (err) throw err;
        const {roles} = await inquirer.prompt([
            {
                name: 'roles',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What role does this employee have?: '
            }
        ]);
        let rolesId;
        for (const row of res) {
            // if the selected choice matches the role id of an existing role, the new employee is given that role //
            if (row.title === roles) {
                rolesId = row.id;
                continue;
            }
        }
        db.query('SELECT * FROM employee', async (err, res) => {
            if (err) throw err;
            let names = res.map(res => `${res.first_name} ${res.last_name}`);
            names.push('No manager');
            let { emplyManager } = await inquirer.prompt([
                {
                    name: 'emplyManager',
                    type: 'list',
                    choices: names,
                    message: 'Who will this employees manager be? '
                }
            ]);
            let managerId;
            let managerName;
            if (emplyManager === 'No manager') {
                managerId = null;
                } else {
                    for (const row of res) {
                        row.mngrName = `${row.first_name} ${row.last_name}`;
                        if (row.mngrName === emplyManager){
                            managerId = row.id;
                            managerName = row.mngrName
                            continue;
                        }
                    }
                }
            console.log('New employee added!');
            db.query('INSERT INTO employee SET ?', 
            {
                first_name: newEmply.firstname,
                last_name: newEmply.lastname,
                role_id: rolesId,
                managers_id: managerId
            },
            (err, res) => {
                if (err) throw err;
                // call inquirer to start again //
                callQuestions();
                }
            )
        });
    });
}

async function updateEmply() {
    const employee_id = await inquirer.prompt(emplyId());
    db.query('SELECT roles.id, roles.title FROM roles ORDER BY roles.id;', async (err, res) => {
        if (err) throw err;
        const {roles} = await inquirer.prompt([
            {
                name: 'roles',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is this employees new role?: '
            }
        ]);
        let rolesId;
        for (const row of res) {
            if (row.title === roles) {
                rolesId = row.id;
                continue;
            }
        }
        // if role changes then manager may change, use previously written query from add employee but tweak to fit //
        db.query('SELECT * FROM employee', async (err, res) => {
            if (err) throw err;
            let names = res.map(res => `${res.first_name} ${res.last_name}`);
            names.push('They are a manager');
            let { emplyManager } = await inquirer.prompt([
                {
                    name: 'emplyManager',
                    type: 'list',
                    choices: names,
                    message: 'Who will this employees manager be? '
                }
            ]);
            let managerId;
            let managerName;
            if (emplyManager === 'They are a manager') {
                managerId = null;
                } else {
                    for (const row of res) {
                        row.mngrName = `${row.first_name} ${row.last_name}`;
                        if (row.mngrName === emplyManager){
                            managerId = row.id;
                            managerName = row.mngrName
                            continue;
                        }
                    }
                }
            db.query(`UPDATE employee SET role_id = ${rolesId}, managers_id = ${managerId} WHERE employee.id = ${employee_id.id}`, async (err, res) => {
                if (err) throw err;
                console.log('The employees role has been updated.');
                // call inquirer to start again //
                callQuestions();
            }); // update query ends
        });// manager name query ends
    });// role change query ends 
};// whole function ends