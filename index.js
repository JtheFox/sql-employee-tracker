const table = require('console.table');
const prompts = require('./utils/prompts');
const queries = require('./utils/queries')

async function main() {
    const choice = await prompts.menu();
    if (choice === 'quit') return;
    else if (!prompts[`${choice}`]) await queries[`${choice}`]();
    else {
        const addVal = await prompts[`${choice}`]();
        await queries[`${choice}`](addVal);
    }

    main();
}

main();