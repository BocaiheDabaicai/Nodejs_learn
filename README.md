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
