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
