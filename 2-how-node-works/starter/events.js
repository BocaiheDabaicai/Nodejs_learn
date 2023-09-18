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

////////////////////////
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