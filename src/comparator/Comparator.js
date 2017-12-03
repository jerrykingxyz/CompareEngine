class Comparator {
    preprocess (obj) {
        return obj;
    }
    compare (key1, value1, key2, value2) {}
    postprocess (key, value) {}
}

module.exports = Comparator;
