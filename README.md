# CompareEngine
a simple compare engine.
[中文](README_CN.md)

## Installation
> npm install compare-engine

## Usage
```javascript
    const CompareEngine = require('compare-engine');
    let engine = new CompareEngine.Engine(comparator, storage);
    engine.addInput(obj);
```
> __comparator__: ***instance*** extends `CompareEngine.Comparator`.

> __storage__: ***instance*** extends `CompareEngine.Storage`. key-value storage.

there are some comparator and storage you can use.

 ### __comparator__

> `CompareEngine.ArticleComparator` (__config__): comparison of different articles.
* __dependencies: npm install leven@^2.1.0__
* __WARN: the comparison algorithm is not suitable for fast comparison, so don't use it in large-scale comparisons.__
```javascript
    const config = {
        // regular expression split articles, default: /[，。,\.\n]/
        split: /[，。,\.\n]/,
        // chunk min length, default: 5
        chunkMinLength: 5,
        // threshold, default: 1
        threshold: 1
    };
    let articleComparator = new CompareEngine.ArticleComparator(config);
```

> `CompareEngine.ImageComparator`(): comparison of different images by phash.
* __dependencies: npm install phash__
```javascript
  let imageComparator = new CompareEngine.ImageComparator();
```

### __storage__

> `CompareEngine.CacheStorage` (): store compare result in memory.
```javascript
  let cacheStorage = new CompareEngine.CacheStorage();
```

> `CompareEngine.FileStorage` (__dirPath__): store compare result in a directory.
* __WARN: __dirPath__ must be a string, if the __dirPath__ not exist, it will use `fs.mkdir()` to create.__
```javascript
  let fileStorage = new CompareEngine.FileStorage('storage directory path');
```

## License
MIT licensed

Copyright (c) 2017 jinrui
