'use strict';

class CompareEngine {
    constructor (comparator, storage) {
        if ( !storage ) throw new Error('compare engine storage required');
        if ( !comparator ) throw new Error('compare engine comparator required');

        this.comparator = comparator;
        this.storage = storage;
    }

    addInput (input) {
        let comparator = this.comparator;
        let storage = this.storage;

        return (async function () {
            let base = comparator.preprocess(input);

            let list = await storage.getAll();

            let baseKey = await storage.setValue(null, base);

            for (let i = 0; i < list.length; i++) {
                let key = list[i];
                let value = await storage.getValue(key);
                let needUpdate = await comparator.compare(baseKey, base, key, value);
                if ( needUpdate ) await storage.setValue(key, value);
            }
            await storage.setValue(baseKey, base);
            await comparator.postprocess(baseKey, base);
            return baseKey;
        })();
    }
}

module.exports = Object.assign({
    Engine: CompareEngine
}, require('./storage/index'), require('./comparator/index'));
