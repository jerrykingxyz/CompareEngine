'use strict';

/**
 * An abstract comparator class
 * @class
 */
class Comparator {

    /**
     * preprocess the input data
     * @param {...*} args Engine input arguments
     * @return {(Promise<*> | *)} This value is used in the next comparison
     */
    preprocess (...args) {
        return args[0];
    }

    /**
     * compare two data
     * @param key1
     * @param value1
     * @param key2
     * @param value2
     * @return {(Promise<boolean> | boolean)} If true, engine will save the value2 to storage
     */
    compare (key1, value1, key2, value2) {}

    /**
     * post-process input data before being stored
     * @param key
     * @param value
     * @return {(Promise<*> | *)}
     */
    postprocess (key, value) {}

    /**
     * This method will be called when the engine call finalize.
     * @return {(Promise<*> | *)}
     */
    finalize () {}
}

module.exports = Comparator;
