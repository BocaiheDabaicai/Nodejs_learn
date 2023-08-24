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
