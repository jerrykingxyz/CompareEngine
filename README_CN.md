# CompareEngine
一个简单的比较引擎

## 安装
```
    npm install compare-engine
```
## 用法
```
    let engine = new CompareEngine.Engine(comparator, storage);
    engine.addInput(obj);
```
__comparator__: 一个继承`CompareEngine.Comparator`的实例。 如果你想要自定义比较器你需要覆盖下面的方法。
* `preprocess` (__obj__) __Promise__: 预处理 `obj`, 结果会在接下来的比较中被使用。
* `compare` (__key1__, __value1__, __key2__, __value2__) __Promise__: 比较value1和value2, 如果返回值是Promise.resolve(true)，比较器会保持value2的值. 当所有的比较完成时，value1的值会被保存。
* `postprocess` (__key__, __value__) __Promise__: 在输入的value保存前，进行处理.

__storage__: 一个继承`CompareEngine.Storage`的实例. key-value模式的存储. 如果你想要自定义存储器你需要覆盖下面的方法。
* `getAll` () __Promise__
* `getValue` (__key__) __Promise__
* `setValue` (__key__, __value__)

`CompareEngine` 包含了一些比较器和存储器

__comparator__
* `CompareEngine.ArticleComparator` (__config__): 比较文章不同
__--WARN: 比较算法不适合快速比较，所以不要用于大规模比较。__
```
    const config = {
        // 正则表达式分割文章, default: /[，。,\.\n]/
        split: /[，。,\.\n]/,
        // 数据块最小大小, default: 5
        chunkMinLength: 5,
        // 阈值, default: 1
        threshold: 1
    }
```

__storage__
* `CompareEngine.CacheStorage` (): 存储结果到内存
* `CompareEngine.FileStorage` (__dirPath__): 存储结果到一个目录. __dirPath__ 是一个字符串, 如果__dirPath__ 不存在, 将使用`fs.mkdir()`来创建.


## License
MIT licensed

Copyright (c) 2017 jinrui
