const mysql = require ('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

exports.viewDepartments = async () => {
    db.query('SELECT * FROM DEPARTMENTS', (err, result) => {
        if (err) console.error(err);
        console.log(result);
    });
}