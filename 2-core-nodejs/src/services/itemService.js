const Item = require('../models/item');
const {saveItem, getAllItems, updateItem, deleteItem, exportItemsToCSV} = require('../data/storage');
const {prompt} = require('../helper/input')
const addNewItem = async () => {
    console.clear();
    console.log('===============================');
    console.log('       ADD NEW WISHLIST ITEM  ');
    console.log('===============================');
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
        console.log('\nItem add successfully');
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
    console.log('===============================');
    console.log('       ALL WISHLIST ITEMS      ');
    console.log('===============================');
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
        console.log(`Error : ${err.message}`.red);
        await prompt('\nPress Enter to continue...');
        return true;
    }
}
const updateItemByID = async() => {
    console.clear();
    console.log('===============================');
    console.log('      UPDATE WISHLIST ITEM     ');
    console.log('===============================');   
    try {
        const items = await getAllItems();
        if(items.length === 0) throw new Error('No items found in your wishlist');
        const idStr = await prompt('\nEnter the ID of the item to update: ');
        const id = parseInt(idStr);
        if(isNaN(id)) throw new Error('Invalid ID. please enter a number');
        const item = items.find(item => item.id === id);
        if(!item) throw new Error(`Item with ${id} ID not found`);
        console.log(`\nUpdating item: ${item.name} ($${item.price}, ${item.store})`);

        const name = await prompt('Enter item name: ');
        if(!name) throw new Error('Name is required');

        const priceStr = await prompt('Enter item price: ');
        const price = parseFloat(priceStr);
        if(isNaN(price) || price <= 0 ) throw new Error('Price need to be a positive number: ');

        const store = await prompt('Enter item store: ');
        if(!store) throw new Error('Store is required');

        const updatedItem = {name, price, store};
        await updateItem(id, updatedItem);
        console.log('\nItem updated successfully');
        await prompt('\nPress Enter to continue...');
    } catch (err) {
        console.log(`Error : ${err.message}`.red);
        await prompt('\nPress Enter to continue...');
    }

}
const deleteItemByID = async () => {
    console.clear();
    console.log('===============================');
    console.log('      DELETE WISHLIST ITEM     ');
    console.log('==============================='); 
    try {
        const items = await getAllItems();
        if(items.length === 0) throw new Error('No items found in your wishlistt');
        const idStr = await prompt('\nEnter the ID of the item to delete: ');
        const id = parseInt(idStr);
        if(isNaN(id)) throw new Error('Invalid ID. please enter a number');
        const confirmation = await prompt('\nAre you sure you want to delete this item? (y/n): ');
        if(confirmation.toLowerCase()!== 'y' && confirmation.toLowerCase()!=='yes'){
            console.log('\nDeletion cancelled');
            await prompt('\nPress Enter to continue...')
            return true;
        }
        await deleteItem(id);
        console.log('\nItem deleted successfully!');
        await prompt('\nPress Enter to continue...');
    } catch (err) {
        console.log(`Error : ${err.message}`.red);
        await prompt('\nPress Enter to continue...');
    }
}
const showSummary = async() => {
    console.clear();
    console.log('===============================');
    console.log('      WISHLIST SUMMARY        ');
    console.log('===============================');
    try {
        const items = await getAllItems();
        if(items.length === 0) throw new Error('No items found in your wishlistt');
        const totalItems = items.length;
        const totalCost = items.reduce((acc, item) => acc + item.price,0);
        const averagePrice = totalCost/totalItems;
        const mostExpensiveItem = items.reduce((acc, item) =>  acc.price > item.price ? acc : item, items[0]);
        console.log('\nWISHLIST STATISTICS:');
        console.log('----------------------------');
        console.log(`Total items: ${totalItems}`);
        console.log(`Total cost: $${totalCost}`);
        console.log(`Average price: $${averagePrice}`);
        console.log('\n💰 MOST EXPENSIVE ITEM:');
        console.log('----------------------------');
        console.log(`Name: ${mostExpensiveItem.name}`);
        console.log(`Price: $${mostExpensiveItem.price}`);
        console.log(`Store: $${mostExpensiveItem.store}`);
        await prompt('\nPress Enter to continue...');
    } catch (err) {
        console.log(`Error : ${err.message}`.red);
        await prompt('\nPress Enter to continue...');
    }
}
const exportToCSV = async() => {
    console.clear();
    console.log('===============================');
    console.log('      EXPORT WISHLIST TO CSV  ');
    console.log('===============================');
    try {
        const items = await getAllItems();
        if(items.length === 0) throw new Error('No items found in your wishlist');
        const filePath = await exportItemsToCSV(items);
        console.log(`\nFile saved to: ${filePath}`);
        await prompt('\nPress Enter to continue...');
    } catch (err) {
        console.log(`Error : ${err.message}`.red);
        await prompt('\nPress Enter to continue...');
    }
}
module.exports = {
    addNewItem,
    listAllItems,
    updateItemByID,
    deleteItemByID,
    showSummary,
    exportToCSV
}