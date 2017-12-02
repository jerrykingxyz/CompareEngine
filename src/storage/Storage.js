class Storage {
    getAll () {
        return Promise.resolve([])
    }
    getValue (key) {}
    setValue (key, value) {}
}

module.exports = Storage;