const Comparator = require('./Comparator');

class ArticleComparator extends Comparator {
    constructor (config) {
        super();
        this.leven = require('leven');
        this.config = Object.assign({
            split: /[，。,\.\n]/, ///(?![a-zA-Z0-9])[，。,\.\n](?![a-zA-Z0-9])/,
            chunkMinLength: 5,
            threshold: 1,
            saveToNth: 1
        }, config);
    }

    preprocess (text) {
        if ( typeof text !== 'string' ) throw new Error('article comparator preprocess error');

        let config = this.config;
        let chunk = text.replace(/ /g, '').split(config.split).filter(function (e) {
            return e.length > (config.chunkMinLength - 1);
        });

        return {
            similar: [],
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
        this.updateSimilar(value1.similar, {
            index: key2,
            similarity: similarity1,
            info: similar_info1
        });

        return this.updateSimilar(value2.similar, {
            index: key1,
            similarity: similarity2,
            info: similar_info2
        });
    }

    updateSimilar (similar, item) {
        for (let i in similar) {
            if (item.similarity > similar[i].similarity) {
                similar.splice(i, 0, item);
                if (similar.length > this.config.saveToNth) {
                  similar.pop();
                }
                return true;
            }
        }
        if (similar.length < this.config.saveToNth) {
            similar.push(item);
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
