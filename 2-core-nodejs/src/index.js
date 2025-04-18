const {showMainMenu} = require('./helper/messages');
require('colors');
console.clear();
const handleOption = async (option) => {
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
            process.exit(0);
            break;
        default:
            console.log('\nInvalid option. Press Enter to continue with a valid option...'.red);
            return false;
    }   
    return true; 
}
const main = async () => {
    console.clear();
    let validOption = true;
    while(validOption){
        const option = await showMainMenu();
        validOption = await handleOption(option);
        if(!validOption){
            validOption = await new Promise(resolve => {
                const readline = require('readline');
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question('', () => {
                    rl.close();
                    resolve(true);
                });
            });
        }
    }
}
main().catch(err => {
    console.log('An error has ocurred:', err);
    process.exit(1);
});
