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
    await queries.addDepartment(departmentName);
    await queries.viewDepartments();
}

exports.addRole = async () => {
    const departments = await queries.getList('departments');
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
        type: 'list',
        name: 'roleDepartment',
        message: 'Which department is the role in?',
        choices: departments
    });

    const department_id = await queries.getID('departments', roleDepartment);
    await queries.addRole([roleTitle, roleSalary, department_id]);
    await queries.viewRoles();
}

exports.addEmployee = async () => {
    const roles = await queries.getList('roles');
    const employees = await queries.getList('employees');
    const { firstName } = await inquirer.prompt({
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?'
    });
    const { lastName } = await inquirer.prompt({
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?'
    });
    const { employeeRole } = await inquirer.prompt({
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s role?',
        choices: roles
    });
    const { employeeManager } = await inquirer.prompt({
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        choices: ['None', ...employees]
    });

    const role_id = await queries.getID('roles', employeeRole);
    const manager_id = employeeManager === 'None' ? null : await queries.getID('employees', employeeManager);
    await queries.addEmployee([firstName, lastName, role_id, manager_id]);
    await queries.viewEmployees();
}

exports.updateEmployee = async () => {
    const employees = await queries.getList('employees');
    const roles = await queries.getList('roles');
    const { employeeToUpdate } = await inquirer.prompt({
        type: 'list',
        name: 'employeeToUpdate',
        message: 'Which employee\'s role is being updated?',
        choices: employees
    });
    const { roleToUpdate } = await inquirer.prompt({
        type: 'list',
        name: 'roleToUpdate',
        message: 'What is the employee\'s updated role?',
        choices: roles
    });

    const employee_id = await queries.getID('employees', employeeToUpdate);
    const role_id = await queries.getID('roles', roleToUpdate);
    await queries.updateEmployee(employee_id, role_id);
    await queries.viewEmployees();
}