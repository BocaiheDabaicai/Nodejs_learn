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
