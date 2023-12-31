# Node.Js

首次开仓于--------2023.06.12

第0章 Promise 在JS板块 完结

---

## 第1章 概述

nodeJs：是JavaScript运行时的引擎

为什么适合后端编程？

- 单线程，基于事件驱动，非阻塞型的IO模型

- 适合构建超快速、可扩展的数据密集型应用程序

- 前后端代码统一

- 免费资源库

- 大型活动社区

提示：NodeJS不使用在多线程、繁重服务器端的应用程序上

#### 1.1 文件操作

首先通过`require('fs)`获取文件模块

| 名称   | 说明                                                                   | 补充                     |
| ---- | -------------------------------------------------------------------- | ---------------------- |
| 读取文件 | `fs.readFileSync('./txt/input.txt','utf-8')`                         | 示例中的参数，地址和编码方式         |
| 写入文件 | `fs.writeFileSync('./txt/output.txt',textOut);`                      | 示例中的参数，地址和内容           |
| 异步读取 | `fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {}`         | 参数，文件地址、编码格式、回调函数      |
| 异步写入 | `fs.writeFile('./txt/final.txt','abcde','utf-8', (err, data4) => {}` | 参数，文件地址、写入内容、编码格式、回调函数 |

#### 1.2 创建、监听服务器

首先引入`const http = require('http')`模块

1. 创建服务器

```js
const server = http.createServer((req,res)=>{
    res.end('Hello from the server!')
})
```

2. 监听服务器

说明，设置端口号、地址、回调函数（当被访问时触发）

```js
server.listen(8001,'127.0.0.1',()=>{
    console.log('Listening to requests on port 8001')
})
```

#### 1.3 使用服务器、设置路由

指令启动服务器，如果对文件进行更改，要记得重启服务器

`node index.js`

设置路由

- 获取请求路由，`req.url`

- 设置响应头，`res.writeHead(状态码,{响应头})`

示例：

```js
res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        })
```

#### 1.4 总结

过去安装依赖的命令

`npm install slugify --save`

现在可以省略掉

`--save`

全局安装

`--global`

😉监听改变，自动重启node服务器

`npm install nodemon --save-dev`

**npm指令**

| 指令              | 解释       | 备注  |
| --------------- | -------- | --- |
| `npm updated`   | 检查依赖是否过期 |     |
| `npm uninstall` |          |     |
| `npm update`    | 更新依赖     |     |

**版本号说明**

表现形式：`xx.yy.zz`

- `zz`：发生更新，修复包中的错误

- `yy`：发生更新，发布新功能，向后兼容

- `xx`：发生更新，次代版本代码可能失效

---

## 第二章 Web是如何工作的？

#### 2.1 请求响应模型

请求由：

1. 协议、域名、资源名

2. 协议、IP地址、端口号(https 的默认端口号为443、http的默认端口号为80)

`request`:

- 请求方式、请求目标、HTTP版本

- 请求头

- 请求体

`response`:

- HTTP版本、状态码、状态消息

- 响应头

- 响应体

请求到响应的整个过程：

1. 将请求连接发送至DNS服务器，获取对应的IP地址和端口号

2. 服务器向客户端发起`TCP/IP`套接字连接

3. 客户端发起请求

4. 服务器返回响应

> 提示：
> 
> `http`与`https`之间的区别是，`https`使用了TLS或SSL加密
> 
> TCP(通讯传输协议)：分解请求，拿到所有的数据包小块
> 
> IP(网络通信协议)：将数据包全部发送至客户端

5. 客户端读取数据 
   
   - 读取入口文件(`.html`)
   
   - 扫描资源文件(`.css,.js`)
   
   - 呈现页面

#### 2.2 前端对比后端

两种网站形式：

1. 动态网站，数据库拿到数据、使用模板、生成网站、发送给浏览器

2. API，数据库拿到数据、生成`JSON`格式、发送给浏览器

> 动态网站，因为整个过程都是在服务器上完成的，也被称为SSR（服务器渲染）
> 
> API，因为获取数据过程发生在服务器上，而浏览器渲染发生在客户端，因此被称为CSR（客户端渲染）

---

## 第三章 Node.js

#### 3.1 node.js 的架构

组成部分：`v8引擎`、`libuv`（关注异步的IO、事件循环、线程池）、`http-parser`、`c-ares`、`OpenSSL`、`zlib`

主体是`v8引擎`、`libuv`

其余的介绍如下：

1. `http-parser`，用于解析`http`

2. `c-ares`，用于DNS请求的东西

3. `OpenSSL`，保存记录

4. `zlib`，用于压缩

**node.js 的运行**

`Node.js`运行在单线程的环境中，过程如下：

1. 初始化项目

2. 执行顶层代码

3. 获取模块

4. 注册事件循环

5. 开启事件循环（核心）

另外，因为事件循环任务繁重，`libuv`会开启线程池，将事件循环的其它任务分割为最多128个线程，主要分类为四种任务：文件工作、加密与解密、压缩、DNS查阅，以减轻事件循环的压力，使得事件循环中保留主要任务

#### 3.2 Node.js核心 事件循环

1. 非顶层代码都会在事件循环体中运行

2. Node.js围绕回调函数构建的

3. 事件驱动结构，事件发出、事件循环体获取事件、回调被反馈

4. 事件循环是精心布置的

服务开启之后会处于运行状态，每当接收到新的请求时，处理请求，反馈数据，并再次进入监听状态，直到服务结束为止。

#### 3.3 Node.js 执行实践

```js
// 2. 获取模块文件
const fs = require("fs");
const crypto = require("crypto")
const start = new Date()

process.env.UV_THREADPOOL_SIZE = 2


// 3. 逐一获取事件
setTimeout(() => console.log("Timer 1 finished"), 0)  //  1
setImmediate(() => console.log("Immediate 1 finished"))  //  2

fs.readFile("./test-file.txt", () => {     // 3
    console.log("I/O finished")
    console.log("-------------")

    setTimeout(() => console.log("Timer 2 finished"), 0)
    setTimeout(() => console.log("Timer 3 finished"), 3000)
    setImmediate(() => console.log("Immediate 2 finished"))

    process.nextTick(() => console.log("Process.nextTick"))

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    })

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    })

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    })

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    })


})

// 1. 执行顶层代码
console.log("Hello from the top-level code")
```

#### 3.4 发生事件与监听事件

运行的过程：

1. 事件发出

2. 事件监听

3. 调用回调函数

其中，*1、2*被称作观察者模式

**本地事件监听**

```js
const EventEmitter = require("events")

class Sales extends EventEmitter{
    constructor() {
        super();
    }
}

const myEmitter = new Sales()

// 2. 监听事件
// 3. 按顺序启用回调函数
myEmitter.on("newSale", () => {
    console.log("There was a new sale!")
})

myEmitter.on("newSale", () => {
    console.log("Costumer name: Liu")
})

myEmitter.on("newSale", (stock) => {
    console.log(`There are now ${stock} items left in stock`)
})


// 1. 发出事件
myEmitter.emit("newSale");
```

**服务器事件监听**

```js
const http = require("http")


// 1. 创建监听者
const server = http.createServer()

// 2. 创建服务器监听者，监听服务器进行的事件
server.on("request",(req,res) => {
    console.log("Request received!")
    res.end("Request received")
})

server.on("request",(req,res) => {
    console.log("Another request 😀")
})

server.on("close",() => {
    console.log("Server closed")
})

// 3. 创建服务器监听者，监听请求地址
server.listen(8001,'127.0.0.1',()=>{
    console.log("Waiting for requests...")
})
```

#### 3.5 流式传输

解释：片段地传输数据，过程中没有完成整个读取、写入操作，不会一直将数据保存在存储中

流的种类：

| 名称         | 描述                 | 例子           |
| ---------- | ------------------ | ------------ |
| 可读流        | 流传输可读取的数据          | http请求、文件读取流 |
| 可写流        | 向流传输写入的数据          | http响应、文件写入流 |
| 双工流（可写、可读） | 流可传输读取的数据、可发送写入的数据 | socket       |
| 转换流        | 多个流，可转换传输或发送功能     | Gzip         |

#### 3.6 commonJs模块系统

1. 每个js文件都被认为是一个单独的模块

2. Node.js使用`CommonJS`模块系统

3. ES模块系统使用在浏览器上

4. 都可以在Node环境中使用

`require`时发生的事情

1. 按顺序读取核心模块、开发者模块（自定义JS文件）、`express`

2. 包装模块

3. 执行模块

4. 返回输出

---

## 第四章 Promise 略

---

## 第五章 Express

#### 5.1 基本理论

`Express`：

- 微小型NodeJS框架，一个高等级的抽象层

- 包含健壮结构的集合，复杂路由、请求响应处理、中间件、服务器渲染

- 可以快速开发应用程序

- 用MVC架构可以更容易地组织我们地应用程序

`API`：应用程序接口

`Rest`架构：

- 逻辑层分离API

- 暴露URL结构

- 使用HTTP方法

- 以JSON格式发送数据

- 保持无状态

请求方式的作用

| 名称     | 作用  |
| ------ | --- |
| POST   | 创建  |
| GET    | 读取  |
| PUT    | 更新  |
| PATCH  | 更新  |
| DELETE | 删除  |

服务器中不好的做法

1. 记录前端的状态

2. 请求包含资源，不要包含操作

#### 5.2 中间件

说明：中间件是请求与响应之间对请求、响应对象做**辅助性操作**的控件，中间件不止一个，单个请求响应中，所有的中间件称为中间件堆栈

作用：

1. 分析请求体

2. 作日志记录

3. 设置请求头

4. 路由操作

总结：类似于请求与响应拦截器，可以在中间器中对请求或响应对象进行操作，最终通过`next()`函数放行

#### 5.3 中间件写法

```js
const express = require('express')
const app = express();
const morgan = require('morgan')

// 添加中间件
// 3. 引用外部集成的中间件
app.use(morgan('dev'));

// 2. 获取请求体
app.use(express.json())

app.use((req, res, next) => {
    console.log('Hello from the middleware 😐')
    next()
})

// 1. 基本中间件，接收请求与响应对象
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})
```

#### 5.4 路由器

首先获取总路由器，使用`express()`

分管支路及路由器对象

说明：假设 app 是总路由器，则`app.use('支路',路由器对象)`，生成一条路由

生成路由器对象，`const router = express.Route()`

配置子路由，`router.route('子路由')`，命名可以不止一个

配置子路由方法，可以配置多种方法，例如`get`，`post`等等方法，最好以链式方法配置

#### 5.4 路由写法

- 初版写法，请求连接，返回响应

```js
app.get('/',(req,res)=>{
    // res.status(200).send('Hello from the server side!')
    res
        .status(200)
        .json({messsage:'Hello from the server side!',app:'Natours'})
})

app.post('/',(req,res)=>{
    res.send('You can post to this endpoint...')
})
```

- 二版写法，路由请求，外部方法

```js
// 全部请求
app.get('/api/v1/tours', getAllTours)

// 命名参数请求
// 直接获取格式 /:name
// 可选获取格式 /:name?
// params 读取参数
app.get('/api/v1/tours/:id', getIdTour)

// 发送请求
app.post('/api/v1/tours', PostTour)

// 发送Patch请求
app.patch('/api/v1/tours/:id', PatchTour)

// 删除请求
app.delete('/api/v1/tours/:id', deleteTour) .post(postUser)
```

- 三版写法，路由地址，链式请求，外部方法

```js
app.route('/api/v1/users')
    .get(getAllUsers)
    .post(postUser)

app.route('/api/v1/users/:id')
    .get(getIdUser)
    .patch(updateUser)
    .delete(deleteUser)
```

- 四版写法
  
  1. 生成路由器对象，配置目标地址、链式请求方法
  
  2. 服务器对象配置源地址，路由器对象

```js
// 路由连接
const tourRouter = express.Router();
const userRouter = express.Router();

// 重构写法
tourRouter.route('/')
    .get(getAllTours)
    .post(postTour)

tourRouter.route('/:id')
    .get(getIdTour)
    .patch(updateTour)
    .delete(deleteTour)

userRouter.route('/api/v1/users')
    .get(getAllUsers)
    .post(postUser)

userRouter.route('/api/v1/users/:id')
    .get(getIdUser)
    .patch(updateUser)
    .delete(deleteUser)


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
```

- 第五版写法，结构化配置
  
  1. 配置路由器对象
  
  2. 引入`app.js`，并为路由器对象配置子路由

```js
// app.js 入口文件
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter) 

// tourRoutes.js,方法省略
const express = require("express");
const router = express.Router();

router.route('/')
    .get(getAllTours)
    .post(postTour)

router.route('/:id')
    .get(getIdTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;
// userRoutes.js,略
```

- 第六版写法，项目化写法
  
  1. `app.js`，接入路由对象，并配置响应路由前缀
  
  2. `server.js`，启动服务器对象
  
  3. `tourRouter.js`，代表子路由对象，配置当前路由下的各种请求方法
  
  4. `tourController.js`，用于存放子路由对象要使用的方法

```js
// --------app.js-------- 
const fs = require('fs')
const express = require('express')
const app = express();
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// 1. 中间件
console.log(process.env.NODE_ENV)
// 开发环境监测
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// 添加中间件
app.use(morgan('dev'));
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
    console.log('Hello from the middleware 😐')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


// 4. 启动服务
module.exports = app;

// --------server.js--------
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app.js')

console.log(app.get('env'))
// console.log(process.env)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

// --------tourRouter.js--------
const express = require('express');
// const tourController = require('./../controllers/tourController')
const {
  checkID,
  checkBody,
  getAllTours,
  postTour,
  getIdTour,
  updateTour,
  deleteTour,
} = require('./../controllers/tourController.js');
const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, postTour);

router.route('/:id').get(getIdTour).patch(updateTour).delete(deleteTour);

module.exports = router; 

// --------tourController.js-------- 略
```

#### 5.5 环境变量

引入方法`dotenv`，可以使得服务器对象在运行过程中使用预定义的名称或变量

*注意：要在引入`APP.JS`之前完成配置*

```js
const dotenv = require('dotenv')
dotenv.config({path: './config.env'}) 

// --------config.env--------
NODE_ENV=development
PORT=8000
USER=LLin
PASSWORD=123456
```

#### 5.6 代码检查与格式化工具 略

---

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
| db.xxx.updateOne()  | 当前数据库下更新指定条件的一条数据   |
| db.xxx.updateMany() | 当前数据库下更新指定条件的多条数据   |
| db.xxx.deleteMany() | 当前数据库下删除指定条件的所有数据   |

查询使用

`db.xxx.find()`

find方法中放入对象进行筛选

1. `find({price:499})`，查询`price`属性值为499的对象

2. `find({price:{$lte:500}})`，查询`price`属性值小于或等于500的对象

3. `find({price:{$lt:500},rating:{$gte:4.8}})`，查询`price`属性值小于500且`rating`大于4.8的对象

4. `find({$or:[price:{$lt:500},rating:{$gte:4.8}]})`，查询`price`属性值小于500或`rating`大于4.8的对象

更新使用

`db.xxx.updateOne()`，`db.xxx.updateMany()`

条件筛选与`find`方法一致

1. `updateOne({price:{$gt:500},rating:{$gte:4.8}},{$set:{price:700}})`，查询`price`属性大于500且比率大于等于4.8的一个对象，将它的价格修改为700

2. `updateOne({price:{$lt:600},rating:4.8},{$set:{premium:true}})`，查询`price`属性小于600且比率等于4.8的所有对象，为它添加新的属性并赋值`premium:true`

删除使用

`db.xxx.deleteMany()`

条件筛选与`find`方法一致

1. `deleteMany({price:{$gt:400}})`，删除`price`大于400的对象

2. `deleteMany({})`，删除当前数据库下xxx集合的所有数据

#### 6.3 连接Atlas云服务器

1. 申请免费的云数据库空间

2. 云数据库连接本地`MongoDB Compass`

3. 测试使用

---

## 第七章 Express,MongoDB

#### 7.1 编写文档规则

- 设置属性

- 设置必要性

- 设置属性规则

- 枚举值，可选

- 数据类型

代码示例如下

```js
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour muse have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 40 characters'],
      validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour muse have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a group difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 1.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour muse have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// 虚拟属性
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// 中间件
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/*
tourSchema.pre('save', function (next) {
  console.log('Will save document...');
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});
*/

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} millisecond!`);
  console.log(docs);
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this);
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
```

最后使规则生效，并返回文档对象，以便可以进行查询、更新、删除操作

中间件可以在执行相应操作时生效，通过`next()`方法将调整后的数据发送至操作函数

#### 7.2 编写请求函数

异步编程方法，获取参数（可选）执行数据库操作，并返回结果数据，如果出现错误，那么抛出错误标识符与错误信息

示例代码如下：

```js
exports.getIdTour = async (req, res) => {
  console.log(req.params);
  try {
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
```

#### 7.3 配置请求路由

在配置的子路由的请求方式下，传入获取数据的函数

示例如下：

```js
router.route('/:id').get(getIdTour)
```

#### 7.4 封装查询方法

链式查询方法，通过第一次默认查询得到的结果进行后续深入操作（过滤、排序、限制属性、分页），每次完成操作之后，返回封装对象。

示例代码如下：

```js
filter() {
    // 1. 过滤
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. 进一步过滤
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(this.query, queryObj);
    console.log(JSON.parse(queryStr));

    this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }
```

---

## 第八章 调式代码

#### 8.1 错误类型

- 可预测错误，可以预测到的错误，并且可以提前处理，例如无效路径、无效用户输入、连接失败、请求超时等等

- 编码错误，开发者写入的`Bug`，例如读取的属性、传入参数、同步代码、请求体选择

解决方法，使用中间件捕获错误，并返回响应

#### 8.2 封装错误对象

为了更好地管理各种类型地错误，以及应对不同的环境，示例如下：

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
```

#### 8.3 优化错误捕获代码

过去的同步请求代码的执行逻辑是每请求一次，如果发生错误，则需要在`catch`模块中对错误进行处理，改良的办法就是定义一个接收函数参数的函数，并在这个函数的结尾处放入`catch`语句进行返回，那么在请求函数中，则只需要把使用到的同步函数传入即可。

示例代码如下：

```js
// 错误捕获函数
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// 请求函数
exports.getIdTour = catchAsync(async (req, res,next) => {
  console.log(req.params);
  const tour = await Tour.findById(req.params.id);
  // const tour = await Tour.findOne({ _id: req.params.id });
  if(!tour){
    return next(new AppError('No tour found with that ID',404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
```

#### 8.4 处理错误

当请求发生错误的时候，会使程序运行到底部的中间件中，中间件中的函数进行执行，获取到抛出的错误，并对错误进行妥善处理。

中间件

`app.use(globalErrorHandler);`

错误处理代码

```js
module.exports = (err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    // 我的环境中没有name属性
    // 如果要使用，条件改变为 if (error)
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    // 重复性错误
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
```

分为开发环境和生产环境，返回不同的错误信息，用户可以看到很简洁的错误内容，开发者可以看到完整的错误信息。

#### 8.5 处理其他错误

- 出现多个同名的数据

- 服务器未正常启动

- 异常的请求参数

将整个程序的处理错误流程逐渐完善，带给用户和开发者良好、积极的体验，使得程序稳定、健康地运行。
