'use strict';

const fs = require('fs');
const path = require('path');
const Storage = require('./Storage');
const util = require('../utils/util');

class FileStorage extends Storage {
    constructor (dirPath) {
        super();
        if (typeof dirPath !== 'string') throw new Error('File Storage path must a string');
        this.dirPath = dirPath;
    }
    getAll () {
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
        });
    }
    getValue (key) {
        const dirPath = this.dirPath;
        return new Promise(function (resolve, reject) {
            fs.readFile(path.join(dirPath, key), function (err, data) {
                if (err) reject(err);
                else resolve(JSON.parse(data.toString()));
            })
        })
    }
    setValue (key, value) {
        const dirPath = this.dirPath;
        if (!key) {
            key = Date.now() + util.md5(JSON.stringify(value));
        }

        return new Promise(function (resolve, reject) {
            fs.writeFile(path.join(dirPath, key), JSON.stringify(value), function (err) {
                if (err) reject(err);
                else resolve(key, value);
            })
        })
    }
}

module.exports = FileStorage;