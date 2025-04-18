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
        items.push(item);
        await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2));
        return item;
    } catch(err) {
        throw new Error(`Failed to save item ${err.message}`);
    }
}
module.exports = {
    getAllItems,
    saveItem
}