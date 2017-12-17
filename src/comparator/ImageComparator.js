const Comparator = require('./Comparator');

class ImageComparator extends Comparator {

    constructor () {
        super();
        this.phash = require('phash');
    }

    preprocess (image) {
        const phash = this.phash;
        return new Promise(function (resolve, reject) {
            phash.imageHash(image, function (err, phash) {
                if (err) {
                    return reject(err);
                }
                resolve({ phash });
            })
        });
    }

    compare (key1, value1, key2, value2) {
        const distance = this.phash.hammingDistance(value1.phash, value2.phash);

        if (!value1.distance || value1.distance > distance) {
            value1.distance = distance;
            value1.similarity_index = key2;
        }
        if (!value2.distance || value2.distance > distance) {
            value2.distance = distance;
            value2.similarity_index = key1;
            return true;
        }
        return false;
    }

}

module.exports = ImageComparator;
