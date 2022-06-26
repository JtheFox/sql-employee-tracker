const mysql = require ('mysql2');
require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

exports.viewDepartments = () => {
    db.query('SELECT * FROM departments', (err, result) => {
        console.log('\n');
        if (err) console.error(err);
        console.table(result);
        console.log('Use up or down to return to menu')
    });
}