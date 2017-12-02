const Storage = require('./Storage');

class CacheStorage extends Storage {
    constructor () {
        super();
        this.data = {};
        this.maxIndex = 0;
    }
    getAll () {
        return Promise.resolve(Object.getOwnPropertyNames(this.data));
    }
    getValue (key) {
        return Promise.resolve(this.data[key]);
    }
    setValue (key, value) {
        if ( !key ) {
            this.maxIndex ++;
            key = this.maxIndex;
        }

        this.data[key] = value;
        return Promise.resolve(key);
    }
}

module.exports = CacheStorage;
