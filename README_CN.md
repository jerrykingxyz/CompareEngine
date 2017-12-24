# CompareEngine
一个简单的比较引擎

## 安装
> npm install compare-engine

## 用法
```javascript
    let engine = new CompareEngine.Engine(comparator, storage);
    engine.addInput(obj);
```
> __comparator__: 一个继承`CompareEngine.Comparator`的实例。

> __storage__: 一个继承`CompareEngine.Storage`的实例. key-value模式的存储。

`CompareEngine` 包含了一些比较器和存储器

### __comparator__

> `CompareEngine.ArticleComparator` (__config__): 比较文章不同
* __依赖: npm install leven@^2.1.0__
* __警告: 比较算法不适合快速比较，所以不要用于大规模比较。__
```javascript
    const config = {
        // 正则表达式分割文章, default: /[，。,\.\n]/
        split: /[，。,\.\n]/,
        // 数据块最小大小, default: 5
        chunkMinLength: 5,
        // 阈值, default: 1
        threshold: 1,
        // 保存n个最相似的结果, default: 1
        saveToNth: 1
    }
    let articleComparator = new CompareEngine.ArticleComparator(config);
```

> `CompareEngine.ImageComparator`(): 通过phash来比较图片不同.
* __依赖: npm install phash__
```javascript
  let imageComparator = new CompareEngine.ImageComparator();
```

### __storage__
> `CompareEngine.CacheStorage` (): 存储结果到内存
```javascript
  let cacheStorage = new CompareEngine.CacheStorage();
```

> `CompareEngine.FileStorage` (__dirPath__): 存储结果到一个目录.
* __警告: __dirPath__ 是一个字符串, 如果 __dirPath__ 不存在, 将使用`fs.mkdir()`来创建.__
```javascript
  let fileStorage = new CompareEngine.FileStorage('路径字符串');
```


## License
MIT licensed

Copyright (c) 2017 jinrui
