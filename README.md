# CompareEngine
a simple compare engine.
[中文](README_CN.md)

## Installation
```
    npm install compare-engine
```
## Usage
```
    const CompareEngine = require('compare-engine');
    let engine = new CompareEngine.Engine(comparator, storage);
    engine.addInput(obj);
```
> __comparator__: ***instance*** extends `CompareEngine.Comparator`. if you want to define your comparator, there are some method you need to override.
    * `preprocess` (__obj__) __Promise__: preprocess `obj`, the result will be used in next compare.
    * `compare` (__key1__, __value1__, __key2__, __value2__) __Promise__: compare value1 and value2, if the returned promise resolves to true, engine will save the value2. when all is done, value1 will be saved.
    * `postprocess` (__key__, __value__) __Promise__: postprocess compare result before saved.

> __storage__: ***instance*** extends `CompareEngine.Storage`. key-value storage. if you want to define your storage, there are some method you need to override.
    * `getAll` () __Promise__
    * `getValue` (__key__) __Promise__
    * `setValue` (__key__, __value__)

there are some comparator and storage you can use.
> __comparator__
    * `CompareEngine.ArticleComparator` (__config__): comparison of different articles.
    __--WARN: the comparison algorithm is not suitable for fast comparison, so don't use it in large-scale comparisons.__
    ```
        const config = {
            // regular expression split articles, default: /[，。,\.\n]/
            split: /[，。,\.\n]/,
            // chunk min length, default: 5
            chunkMinLength: 5,
            // threshold, default: 1
            threshold: 1
        }
    ```

> __storage__
    * `CompareEngine.CacheStorage` (): store compare result in memory.
    * `CompareEngine.FileStorage` (__dirPath__): store compare result in a directory. __dirPath__ must be a string, if the __dirPath__ not exist, it will use `fs.mkdir()` to create.

## License
MIT licensed

Copyright (c) 2017 jinrui
