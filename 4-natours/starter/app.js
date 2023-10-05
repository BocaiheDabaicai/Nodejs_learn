const fs = require('fs')
const express = require('express')
const app = express();
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// 1. 中间件
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
