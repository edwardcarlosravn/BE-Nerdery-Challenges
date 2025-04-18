const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/wishlist.json');

const ensureDirectoryExists = async () => {
    const dir = path.dirname(dataFilePath);
    try {
        await fs.access(dir);
    } catch(err) {
        console.log(err);
        await fs.mkdir(dir, { recursive: true });
    }
}
const getAllItems = async () =>{
    const flag = await ensureDirectoryExists();
    console.log(flag);
    try{
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    }catch {
        return [];
    }
}
const saveItem = async (item) => {
    const items = await getAllItems();
    items.push(item);
    await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2));
    return item;
}
module.exports = {
    getAllItems,
    saveItem
}