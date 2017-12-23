const Storage = require('./Storage');

class CacheStorage extends Storage {
    constructor () {
        super();
        this.data = {};
        this.maxIndex = 0;
    }
    getAll () {
        return this.data;
    }
    getValue (key) {
        return this.data[key];
    }
    setValue (key, value) {
        if ( !key ) {
            this.maxIndex ++;
            return String(this.maxIndex);
        }

        this.data[key] = value;
    }
}

module.exports = CacheStorage;
