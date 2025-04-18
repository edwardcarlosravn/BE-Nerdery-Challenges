const {showMainMenu} = require('./helper/messages');
const {addNewItem , listAllItems, updateItemByID,deleteItemByID} = require('./services/itemService');
const {prompt} = require('./helper/input');
require('colors');
console.clear();
const handleOption = async (option) => {
    switch (option) {
        case '1':
            await addNewItem();
            break;
        case '2': 
            await listAllItems();
            break;
        case '3':
            await updateItemByID();
            break;
        case '4':
            await deleteItemByID();
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
            await prompt('\nPress Enter to continue...')
    }   
    return true; 
}
const main = async () => {
    console.clear();
    while(true){
        try{
            const option = await showMainMenu();
            await handleOption(option);
        }catch (err) {
            console.log(`Error : ${err.message}`.red)
            await prompt('\nPress Enter to continue...')
        }
    }
}
main().catch(err => {
    console.log('An error has ocurred:', err);
    process.exit(1);
});
