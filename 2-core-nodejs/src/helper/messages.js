const readline = require('readline');
const showMainMenu = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        })
        console.clear();
        console.log('===============================');
        console.log('   WISHLIST TRACKER - MENU    ');
        console.log('===============================');
        console.log(`${'1.'} Add a new item`);
        console.log(`${'2.'} View all items`);
        console.log(`${'3.'} Update an item`);
        console.log(`${'4.'} Delete an item`);
        console.log(`${'5.'} Show summary`);
        console.log(`${'6.'} Export to CSV`);
        console.log(`${'0.'} Exit`);
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