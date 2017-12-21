'use strict';

/**
 * An abstract key-value storage class
 * @class
 */
class Storage {

    /**
     * get key name
     * @return {(Promise<string> | string)}
     */
    getKeyName() {}

    /**
     * get all the items to be compared
     * @return {(Promise<array> | Promise<object> | array | object)} The format can be [keys], [{keyName}], [keys, {keyName}], {key: value}
     */
    getAll () {}

    /**
     * @param {string} key
     * @return {(Promise<*> | *)}
     */
    getValue (key) {}

    /**
     * @param {string} key If the key is null, you need to insert the value and return the key
     * @param {object} value
     * @return {(Promise<string> | string)}
     */
    setValue (key, value) {}

    /**
     * This method will be called when the engine call finalize.
     * @return {(Promise<*> | *)}
     */
    finalize () {}
}

module.exports = Storage;
