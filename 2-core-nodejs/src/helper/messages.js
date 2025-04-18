require('colors');

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})
const showMainMenu = () => {
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
        switch (option) {
            case '1':
                
                break;
            case '2': 
                break;
            case '3':
                break;
            case '4':
                break;
            case '5':
                break;
            case '6':
                break;
            case '0':
                console.log('Thanks for using Edward Wishlist');
                rl.close();
                process.exit(0);
                break;
            default:
                console.log('\nInvalid option. Press Entener to continue with a valid option...');
                rl.question('',() => {
                    showMainMenu();
                })
                break;
        }
    })
}
module.exports = {
    showMainMenu
}