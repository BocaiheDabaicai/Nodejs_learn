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
