const inquirer = require('inquirer');
const queries = require('./queries');

exports.menu = async () => {
    const { menuSelect } = await inquirer.prompt({
        type: 'list',
        name: 'menuSelect',
        message: 'What would you like to do?',
        choices: [
            { name: 'View All Departments', value: 'viewDepartments' },
            { name: 'Add Department', value: 'addDepartment' },
            { name: 'View All Roles', value: 'viewRoles' },
            { name: 'Add Role', value: 'addRole' },
            { name: 'View All Employees', value: 'viewEmployees' },
            { name: 'Add Employee', value: 'addEmployee' },
            { name: 'Update Employee Role', value: 'updateEmployee' },
            { name: 'Quit', value: 'quit' }
        ]
    });
    return menuSelect;
}

exports.addDepartment = async () => {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    });
    queries.addDepartment(departmentName);
    queries.viewDepartments;
}

exports.addRole = async () => {
    const { roleTitle } = await inquirer.prompt({
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the role?'
    });
    const { roleSalary } = await inquirer.prompt({
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?'
    });
    const { roleDepartment } = await inquirer.prompt({
        type: 'input',
        name: 'roleDepartment',
        message: 'Which department is this role in?'
    });

    queries.getID('roles', roleDepartment);
}

exports.addEmployee = async () => {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    });
    queries.addDepartment(departmentName);
    queries.viewDepartments;
}

exports.updateEmployee = async () => {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    });
    queries.addDepartment(departmentName);
    queries.viewDepartments;
}