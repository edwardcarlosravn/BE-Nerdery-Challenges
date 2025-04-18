const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/wishlist.json');

const ensureDirectoryExists = async () => {
    const dir = path.dirname(dataFilePath);
    try {
        await fs.access(dir);
    } catch(err) {
        console.log(err);
        await fs.mkdir(dir);
    }
}
const getAllItems = async () =>{
    await ensureDirectoryExists();
    try{
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    }catch {
        return [];
    }
}
const saveItem = async (item) => {
    try {
        const items = await getAllItems();
        const id = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
        const ItemWidthId = {
            ...item,
            id: id
        }
        items.push(ItemWidthId);
        await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2));
        return item;
    } catch(err) {
        throw new Error(`Failed to save item ${err.message}`);
    }
}
const updateItem = async (id, updatedItem) => {
    try {
        const items = await getAllItems();
        const index = items.findIndex(item => item.id === id);
        if(index === -1) throw new Error(`Item not found`);
        items[index] = {...items[index], ...updatedItem};
        await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2));
        return items[index];
    } catch (err) {
        throw new Error(`Failed to update items: ${err.message}`);
    }
}
const deleteItem = async(id) => {
    try {
        const items = await getAllItems();
        const index = items.findIndex(item => item.id === id);
        if(index === -1) throw new Error(`Item not found`);
        const deletedItem = items[index];
        items.splice(index,1);
        await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2));
        return deletedItem
    } catch (err) {
        throw new Error(`Failed to update items: ${err.message}`);
    }
}
module.exports = {
    getAllItems,
    saveItem,
    updateItem,
    deleteItem
}