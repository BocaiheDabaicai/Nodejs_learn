## 第六章 MongoDB

#### 6.1 MongoDB简介

`MongoDB`是一种非结构型数据库，具备可扩展性、灵活性以及想要的查询和索引效果

特点：

1. 数据格式类似于`JSON`，叫做`BSON`

2. 可以存储数组、对象数组（文档），不总是常见的数据类型

#### 6.2 MongoDB的基本操作

基本操作

| 名称                  | 内容                  |
| ------------------- | ------------------- |
| use xxx             | 使用xxx数据库            |
| show dbs            | 查看所有的数据库            |
| db.xxx.insertOne()  | 当前数据库下xxx集合插入一条数据   |
| db.xxx.insertMany() | 当前数据库下xxx集合插入多条数据   |
| db.xxx.find()       | 当前数据库下查找xxx集合，并返回数据 |

查询使用

`db.xxx.find()`

find方法中放入对象进行筛选

1. `find({price:499})`，查询`price`属性值为499的对象

2. `find({price:{$lte:500}})`，查询`price`属性值小于或等于500的对象

3. `find({price:{$lt:500},rating:{$gte:4.8}})`，查询`price`属性值小于500且`rating`大于4.8的对象

4. `find({$or:[price:{$lt:500},rating:{$gte:4.8}]})`，查询`price`属性值小于500或`rating`大于4.8的对象


