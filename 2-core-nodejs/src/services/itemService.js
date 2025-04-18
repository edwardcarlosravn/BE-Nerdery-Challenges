const Item = require('../models/item');
const {saveItem, getAllItems} = require('../data/storage');
const {prompt} = require('../helper/input')
const addNewItem = async () => {
    console.clear();
    console.log('==============================='.green);
    console.log('       ADD NEW WISHLIST ITEM  '.green);
    console.log('==============================='.green);
    try {
        const name = await prompt('Enter item name: ');
        if(!name) throw new Error('Name is required');

        const priceStr = await prompt('Enter item price: ');
        const price = parseFloat(priceStr);
        if(isNaN(price) || price <= 0 ) throw new Error('Price need to be a positive number: ');

        const store = await prompt('Enter item store: ');
        if(!store) throw new Error('Store is required');

        const newItem = new Item(name, price, store);
        await saveItem(newItem);
        console.log('\nItem add successfully'.green);
        await prompt('\nPress Enter to continue...')
        return true;
    } catch(err) {
        console.log(`Error : ${err.message}`.red)
        await prompt('\nPress Enter to continue...')
        return true;
    }
}
const listAllItems = async() => {
    console.clear();
    console.log('==============================='.green);
    console.log('       ALL WISHLIST ITEMS      '.green);
    console.log('==============================='.green);
    try {
        const items = await getAllItems();
        if(items.length === 0 || items === undefined){
            throw new Error('\nNo items found in your wishlist');
        }else{
            console.log(`\nFound ${items.length} items:\n`)
            items.forEach((item) => {
                console.log(`ID: ${item.id}, Name: ${item.name}, Price: $${item.price.toFixed(2)}, Store: ${item.store}`);
            })
        }
        await prompt('\nPress Enter to continue...')
        return true;
    } catch (err) {
        console.log(`Error : ${err.message}`.red)
        await prompt('\nPress Enter to continue...')
        return true;
    }
}
module.exports = {
    addNewItem,
    listAllItems
}