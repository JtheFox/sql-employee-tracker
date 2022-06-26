const inquirer = require('inquirer');

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
    return departmentName;
}
