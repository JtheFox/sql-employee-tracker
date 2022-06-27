const mysql = require('mysql2/promise');
require('console.table');

const conn = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
}

exports.getList = async (table) => {
    const db = await mysql.createConnection(conn);
    const tableQueries = {
        departments: 'SELECT name FROM departments ORDER BY departments.id',
        roles: 'SELECT title FROM roles ORDER BY roles.id',
        employees: `SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS employee FROM employees ORDER BY employees.id`
    }
    const result = await db.query(tableQueries[`${table}`]);
    let list = result[0].map(e => Object.values(e)[0]);
    return list;
}

exports.getID = async (table, name) => {
    const db = await mysql.createConnection(conn);
    const tableQueries = {
        departments: 'SELECT id FROM departments WHERE name = ?',
        roles: 'SELECT id FROM roles WHERE title = ?',
        employees: `SELECT id FROM employees WHERE CONCAT(employees.first_name, ' ', employees.last_name) = ?`
    }
    const result = await db.query(tableQueries[`${table}`], name);
    let { id } = Object.values(result[0])[0];
    return id;
}

exports.viewDepartments = async () => {
    const db = await mysql.createConnection(conn);
    const result = await db.query('SELECT * FROM departments ORDER BY departments.id');
    console.table(result[0])
}

exports.addDepartment = async (department) => {
    const db = await mysql.createConnection(conn);
    await db.query('INSERT INTO departments (name) VALUE (?)', department);
}

exports.viewRoles = async () => {
    const db = await mysql.createConnection(conn);
    const result = await db.query(
        `SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles
    LEFT JOIN departments ON (departments.id = roles.department_id)
    ORDER BY roles.id;`);
    console.table(result[0]);
}

exports.addRole = async (role) => {
    const db = await mysql.createConnection(conn);
    await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?)', [role]);
}

exports.viewEmployees = async () => {
    const db = await mysql.createConnection(conn);
    const result = await db.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN employees manager on manager.id = employees.manager_id
    INNER JOIN roles ON (roles.id = employees.role_id)
    INNER JOIN departments ON (departments.id = roles.department_id)
    ORDER BY employees.id;`);
    console.table(result[0]);
}

exports.addEmployee = async (employee) => {
    const db = await mysql.createConnection(conn);
    await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)', [employee]);
}

exports.updateEmployee = async (employee_id, role_id) => {
    const db = await mysql.createConnection(conn);
    await db.query('UPDATE employees SET role_id = ? WHERE id = ?', [role_id, employee_id]);
} 