"use strict";
class Collection {
    collection;
    add(el) {
        this.collection.push(el);
    }
    getAll() {
        return this.collection;
    }
}
const collection1 = new Collection();
collection1.add("item");
collection1.getAll();
