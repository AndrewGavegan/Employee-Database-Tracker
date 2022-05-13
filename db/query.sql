SELECT department.id, department.department_name
FROM department 
ORDER BY department.id;

SELECT roles.id, roles.title AS roles, roles.salary AS  salary, department.department_name AS department
FROM roles 
LEFT JOIN department
ON roles.department_id = department.id
ORDER BY roles.id;

SELECT  employee.id, employee.first_name, employee.last_name, roles.title, 
department.department_name AS department, roles.salary, 
CONCAT(manager.first_name, ' ', manager.last_name) AS manager    
FROM employee
LEFT JOIN employee manager ON manager.id = employee.managers_id
INNER JOIN roles ON roles.id = employee.role_id
INNER JOIN department ON department.id = roles.department_id
ORDER BY employee.id;