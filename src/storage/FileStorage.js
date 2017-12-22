'use strict';

const fs = require('fs');
const path = require('path');
const Storage = require('./Storage');
const util = require('../utils/util');

class FileStorage extends Storage {

    constructor (dirPath, enableCache = true) {
        super();
        if (typeof dirPath !== 'string') throw new Error('File Storage path must a string');
        this.dirPath = dirPath;
        this.enableCache = enableCache;

        this.dirtyIndex = [];
        this.cache = null;
    }

    readdir () {
        const dirPath = this.dirPath;

        return new Promise(function (resolve, reject) {
            fs.exists(dirPath, function (exists) {
                resolve(exists);
            })
        }).then(function (exists) {
            if ( !exists ) {
                return new Promise(function (resolve, reject) {
                    fs.mkdir(dirPath, function (err) {
                        if (err) reject(err);
                        else resolve();
                    })
                })
            }
        }).then(function () {
            return new Promise(function (resolve, reject) {
                fs.readdir(dirPath, function (err, data) {
                    if (err) reject(err);
                    else resolve(data);
                })
            })
        })
    }

    readFile (key) {
        const dirPath = this.dirPath;
        return new Promise(function (resolve, reject) {
            fs.readFile(path.join(dirPath, key), function (err, data) {
                if (err) reject(err);
                else resolve(JSON.parse(data.toString()));
            })
        })
    }

    writeFile (key, value) {
        const dirPath = this.dirPath;

        return new Promise(function (resolve, reject) {
            fs.writeFile(path.join(dirPath, key), JSON.stringify(value), function (err) {
                if (err) reject(err);
                else resolve(key);
            })
        })
    }

    async getAll () {
        if (!this.enableCache) {
            return this.readdir();
        }
        if (!this.cache) {
            const list = await this.readdir();
            let cache = {};
            for(let item of list) {
                cache[item] = null;
            }
            this.cache = cache;
        }
        return this.cache;
    }

    async getValue (key) {
        if (!this.enableCache || !this.cache) {
            return this.readFile(key)
        }
        if (this.cache[key] === null) {
            this.cache[key] = await this.readFile(key);
        }
        return this.cache[key];
    }

    setValue (key, value) {
        if (!key) {
            // generate and return new key
            return Date.now() + util.md5(JSON.stringify(value));
        }

        if (!this.enableCache || !this.cache) {
            return this.writeFile(key, value);
        }
        this.cache[key] = value;
        if (this.dirtyIndex.indexOf(key) === -1) this.dirtyIndex.push(key);
    }

    finalize () {
        let needWrite = [];
        for(let key of this.dirtyIndex) {
            needWrite.push(this.writeFile(key, this.cache[key]))
        }
        return Promise.all(needWrite);
    }
}

module.exports = FileStorage;
