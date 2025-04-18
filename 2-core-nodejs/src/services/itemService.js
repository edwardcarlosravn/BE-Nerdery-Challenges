const Item = require('../models/item');
const {saveItem} = require('../data/storage');
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
        const store = await prompt('Enter item store');
        if(!store) throw new Error('Store is required');
        const newItem = new Item(name, price, store);
        const saveditem = await saveItem(newItem);
        console.log(saveditem);
        console.log('\nItem add successfully'.green);
        return true;
    } catch(err) {
        console.log(`Error : ${err.message}`.red)
        return true;
    }
}
module.exports = {
    addNewItem
}