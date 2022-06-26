const prompts = require('./utils/prompts');
const queries = require('./utils/queries');

async function main() {
    const choice = await prompts.menu();
    if (choice === 'quit') process.exit(0);
    else if (!prompts[`${choice}`]) await queries[`${choice}`]();
    else {
        const addVal = await prompts[`${choice}`]();
        await queries[`${choice}`](addVal);
    }
    main();
}

main();
