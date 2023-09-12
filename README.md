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

#### 2.2 实际应用
