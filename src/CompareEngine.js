'use strict';
const Comparator = require('./comparator/Comparator');
const Storage = require('./storage/Storage');

class CompareEngine {
    constructor (comparator, storage) {
        if ( !comparator || !(comparator instanceof Comparator)) throw new Error('compare engine comparator required');
        if ( !storage || !(storage instanceof Storage)) throw new Error('compare engine storage required');

        this.comparator = comparator;
        this.storage = storage;
    }

    addInput (input) {
        let comparator = this.comparator;
        let storage = this.storage;

        return (async function () {
            let base = await comparator.preprocess(input);

            let list = await storage.getAll();

            let baseKey = await storage.setValue(null, base);

            for (let i = 0; i < list.length; i++) {
                let key = list[i];
                let value = await storage.getValue(key);
                let needUpdate = await comparator.compare(baseKey, base, key, value);
                if ( needUpdate ) await storage.setValue(key, value);
            }
            await comparator.postprocess(baseKey, base);
            await storage.setValue(baseKey, base);
            return baseKey;
        })();
    }
}

module.exports = Object.assign({
    Engine: CompareEngine
}, require('./storage/index'), require('./comparator/index'));
