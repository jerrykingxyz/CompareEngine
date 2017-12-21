'use strict';

const Comparator = require('./comparator/Comparator');
const Storage = require('./storage/Storage');

class CompareEngine {

    constructor (comparator, storage) {
        if ( !comparator || !(comparator instanceof Comparator)) throw new Error('compare engine comparator required');
        if ( !storage || !(storage instanceof Storage)) throw new Error('compare engine storage required');

        this.comparator = comparator;
        this.storage = storage;
        this.queue = Promise.resolve();
    }

    addInput (...input) {
        const comparator = this.comparator;
        const storage = this.storage;

        return this.queue.then(async function () {
            let baseKey = null;
            let base = await comparator.preprocess(...input);

            const keyName = await storage.getKeyName();
            if (keyName && base[keyName]) {
                baseKey = base[keyName];
            } else {
                baseKey = await storage.setValue(null, base);
            }

            let list = await storage.getAll();

            if (list instanceof Array) {
                for ( let item of list ) {
                    let key, value;

                    if (typeof item === 'string') {
                        key = item;
                        value = await storage.getValue(key);
                    } else if (keyName && item[keyName]) {
                        key = item[keyName];
                        value = item;
                    } else {
                        continue;
                    }

                    if (key === baseKey) continue;
                    const needUpdate = await comparator.compare(baseKey, base, key, value);
                    if ( needUpdate ) await storage.setValue(key, value);
                }
            } else if (typeof list === 'object') {
                for (let key in list) {
                    let value = list[key];

                    if (key === baseKey) continue;
                    const needUpdate = await comparator.compare(baseKey, base, key, value);
                    if ( needUpdate ) await storage.setValue(key, value);
                }
            }

            await comparator.postprocess(baseKey, base);
            await storage.setValue(baseKey, base);
            return baseKey;
        });
    }

    /**
     * When the engine input is complete, you can call this method to notify the comparator and storage
     * @return {Promise<*>}
     */
    finalize () {
        const comparator = this.comparator;
        const storage = this.storage;

        return this.queue.then(async function () {
            comparator.finalize();
            storage.finalize();
        });
    }
}

module.exports = Object.assign({
    Engine: CompareEngine
}, require('./storage/index'), require('./comparator/index'));
