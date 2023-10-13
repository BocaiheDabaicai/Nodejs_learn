const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1. 中间件
console.log(process.env.NODE_ENV);
// 开发环境监测
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 添加中间件
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello from the middleware 😐');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 放在路由对象下面进行错误路由处理
// 避免路由覆盖现象
app.all('*', (req, res, next) => {
  // 方法一 直接抛出错误
  // res.status(404).json({
  //   status: 'fail',
  //   message: `${req.originalUrl} Page can't be found on this server`,
  // });

  // 方法二 抛出错误对象
  // const err = new Error(
  //   `${req.originalUrl} Page can't be found on this server`,
  // );
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err)

  // 方法三 抛出封装错误对象
  next(new AppError(`${req.originalUrl} Page can't be found on this server`));
});

app.use(globalErrorHandler);

// 4. 启动服务
module.exports = app;
