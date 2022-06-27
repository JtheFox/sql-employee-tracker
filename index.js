const prompts = require('./utils/prompts');
const queries = require('./utils/queries');

async function main() {
    const choice = await prompts.menu();
    choice === 'quit' ? process.exit(0) : prompts[`${choice}`] ? await prompts[`${choice}`]() : await queries[`${choice}`]();
    main();
}

main();