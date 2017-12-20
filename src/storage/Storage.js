/**
 * An abstract key-value storage class
 * @class
 */
class Storage {

    /**
     * get key name
     * @return {string}
     */
    getKeyName() {}

    /**
     * get all the items to be compared
     * @return {array, object} The format can be [keys], [{keyName}], [keys, {keyName}], {key: value}
     */
    getAll () {}

    /**
     * @param {string} key
     * @return {*}
     */
    getValue (key) {}

    /**
     * @param {string} key If the key is null, you need to insert the value and return the key
     * @param {object} value
     * @return {string}
     */
    setValue (key, value) {}
}

module.exports = Storage;
