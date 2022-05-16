
-- adding the departments into the table --
INSERT INTO department (department_name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');
-- adding roles into the table -- 
INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Manager', 75000, 1),
        ('Salesperson', 50000, 1),
        ('Senior Engineer', 95000, 2),
        ('Junior Engineer', 55000, 2),
        ('Accounting Manager', 80000, 3),
        ('Accounting Clerk ', 50000, 3),
        ('Barrister',98000 , 4),
        ('Law Clerk', 55000, 4);
-- adding employees into the table --
INSERT INTO employee (first_name, last_name, role_id, managers_id)
VALUES  ('Mike', 'Chan', 1, NULL),
        ('Ashley', 'Rodriguez', 2, 1),
        ('Kevin', 'Tupik', 3, NULL),
        ('Kunal', 'Singh', 4, 3),
        ('Malia', 'Brown', 5, NULL),
        ('Sarah', 'Lourd', 6, 5),
        ('Tom', 'Allen', 7, NULL),
        ('Rebecca', 'Jones', 8, 7);

