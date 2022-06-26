const mysql = require ('mysql2');
require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

const log = (err, result) => {
    console.log('\n');
    if (err) console.error(err);
    else console.table(result);
    console.log('Use up or down to return to menu')
}

exports.viewDepartments = () => {
    db.query('SELECT * FROM departments', (err, result) => {
        log(err, result);
    });
}

exports.viewRoles = () => {
    db.query(
    `SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles
    LEFT JOIN departments ON (departments.id = roles.department_id)
    ORDER BY roles.id;`, 
    (err, result) => {
        log(err, result);
    });
}

exports.viewEmployees = () => {
    db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN employees manager on manager.id = employees.manager_id
    INNER JOIN roles ON (roles.id = employees.role_id)
    INNER JOIN departments ON (departments.id = roles.department_id)
    ORDER BY employees.id;`, 
    (err, result) => {
        log(err, result);
    });
}