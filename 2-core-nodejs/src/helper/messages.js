require('colors');

const readline = require('readline');
const showMainMenu = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        })
        console.clear();
        console.log('==============================='.green);
        console.log('   WISHLIST TRACKER - MENU    '.green);
        console.log('==============================='.green);
        console.log(`${'1.'.green} Add a new item`);
        console.log(`${'2.'.green} View all items`);
        console.log(`${'3.'.green} Update an item`);
        console.log(`${'4.'.green} Delete an item`);
        console.log(`${'5.'.green}  Export to CSV`);
        console.log(`${'6.'.green} Show summary`);
        console.log(`${'0.'.green} Exit`);
        console.log('===============================');
        rl.question('Select an option: ', (option) => {
            rl.close();
            resolve(option);
        })
    }) 
}
module.exports = {
    showMainMenu
}