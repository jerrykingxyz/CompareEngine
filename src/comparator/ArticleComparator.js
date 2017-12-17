const Comparator = require('./Comparator');

class ArticleComparator extends Comparator {
    constructor (config) {
        super();
        this.leven = require('leven');
        this.config = Object.assign({
            split: /[，。,\.\n]/, ///(?![a-zA-Z0-9])[，。,\.\n](?![a-zA-Z0-9])/,
            chunkMinLength: 5,
            threshold: 1
        }, config);
    }

    preprocess (text) {
        if ( typeof text !== 'string' ) throw new Error('article comparator preprocess error');

        let config = this.config;
        let chunk = text.replace(/ /g, '').split(config.split).filter(function (e) {
            return e.length > (config.chunkMinLength - 1);
        });

        return {
            similarity_index: null,
            similarity: null,
            chunk
        }
    }

    compare (key1, value1, key2, value2) {
        // get same chunk
        let similar_info1 = {};
        let similar_info2 = {};
        for (let i = 0; i < value1.chunk.length; i ++) {
            let chunks1 = value1.chunk[i];
            for (let j = 0; j < value2.chunk.length; j ++) {
                let chunks2 = value2.chunk[j];
                if ( this.checkSimilarity(chunks1, chunks2, this.config.threshold) ) {
                    if (!similar_info1[i]) {
                        similar_info1[i] = j;
                    }
                    if (!similar_info2[j]) {
                        similar_info2[j] = i;
                    }
                }
            }
        }

        // computed similarity
        let similarity1 = Object.getOwnPropertyNames(similar_info1).length / value1.chunk.length;
        let similarity2 = Object.getOwnPropertyNames(similar_info2).length / value2.chunk.length;
        if (!value1.similarity || similarity1 > value1.similarity) {
            value1.similarity_index = key2;
            value1.similarity = similarity1;
            value1.similar_info = similar_info1;
        }
        if (!value2.similarity || similarity2 > value2.similarity) {
            value2.similarity_index = key1;
            value2.similarity = similarity2;
            value2.similar_info = similar_info2;
            return true;
        }
        return false;
    }

    checkSimilarity (a, b, threshold) {

        if (threshold === 1) {
            return a === b;
        }

        const d = this.leven(a.toLowerCase(), b.toLowerCase());

        const longest = Math.max(a.length, b.length);

        return (longest - d) / longest >= threshold;
    }

}

module.exports = ArticleComparator;
