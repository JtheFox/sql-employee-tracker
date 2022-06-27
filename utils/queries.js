const mysql = require ('mysql2');
require('console.table');

const conn = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
}

const log = (err, result) => {
    console.log('\n');
    if (err) console.error(err);
    else console.table(result);
    console.log('Use up or down to return to menu')
}

exports.getList = (table) => {
    const db = mysql.createConnection(conn);
    const tableQueries = {
        departments: 'SELECT name FROM departments ORDER BY departments.id',
        roles: 'SELECT title FROM roles ORDER BY roles.id',
        employees: `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS employee FROM employees ORDER BY employees.id`
    }
    db.query(tableQueries[`${table}`], (err, result) => {
        if(err) log(err);
        let list = result.map(e => Object.values(e)[0]);
    });
}

exports.getID = (table, name) => {
    const db = mysql.createConnection(conn);
    const tableQueries = {
        departments: 'SELECT id FROM departments WHERE name = ?',
        roles: 'SELECT id FROM roles WHERE title = ?',
        employees: `SELECT id FROM employees WHERE CONCAT(employees.first_name, ' ', employees.last_name) = ?`
    }
    db.query(tableQueries[`${table}`], [name], (err, result) => {
        if(err) log(err);
        let id = Object.values(result[0])[0];
    });
}

exports.viewDepartments = () => {
    const db = mysql.createConnection(conn);
    db.query('SELECT * FROM departments ORDER BY departments.id', (err, result) => log(err, result));
}

exports.addDepartment = (department) => {
    const db = mysql.createConnection(conn);
    db.query ('INSERT INTO departments (name) VALUE (?)', department, (err, result) => log(err, result));
}

exports.viewRoles = () => {
    const db = mysql.createConnection(conn);
    db.query(
    `SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles
    LEFT JOIN departments ON (departments.id = roles.department_id)
    ORDER BY roles.id;`, 
    (err, result) => log(err, result));
}

exports.addRole = (role) => {
    const db = mysql.createConnection(conn);
    db.query ('INSERT INTO roles (title, salary, department_id) VALUES (?)', [role], (err, result) => log(err, result));
}

exports.viewEmployees = () => {
    const db = mysql.createConnection(conn);
    db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN employees manager on manager.id = employees.manager_id
    INNER JOIN roles ON (roles.id = employees.role_id)
    INNER JOIN departments ON (departments.id = roles.department_id)
    ORDER BY employees.id;`, 
    (err, result) => log(err, result));
}

exports.addEmployee = (employee) => {
    const db = mysql.createConnection(conn);
    db.query ('INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES (?)', [employee], (err, result) => log(err, result));
}
