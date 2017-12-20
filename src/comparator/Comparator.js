/**
 * An abstract comparator class
 * @class
 */
class Comparator {

    /**
     * preprocess the input data
     * @param {*} obj Engine input arguments
     * @return {*}
     */
    preprocess (obj) {
        return obj;
    }

    /**
     * compare two data
     * @param key1
     * @param value1
     * @param key2
     * @param value2
     * @return {boolean} Need update value2
     */
    compare (key1, value1, key2, value2) {}

    /**
     * post-process the compare result before being stored
     * @param key
     * @param value
     */
    postprocess (key, value) {}
}

module.exports = Comparator;
