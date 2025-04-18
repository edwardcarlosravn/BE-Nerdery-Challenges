class Item {
    constructor(name, price, store){
        this.id = Date.now().toString();
        this.name = name;
        this.price = price;
        this.store = store;
    }
}
module.exports = Item;