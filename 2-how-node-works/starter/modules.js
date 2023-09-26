console.log(arguments)
console.log(require("module").wrapper)

// 自定义模块导出
const C = require('./test-module-1')
const calc1 = new C()
console.log(calc1.add(2,5))

// 输出
/*const calc2 = require('./test-module-2')
console.log(calc2.add(2,5))
console.log(calc2.multiply(2,5))
console.log(calc2.divide(2,5))*/
const {add, multiply, divide,} = require('./test-module-2')
console.log(add(2,5));
console.log(multiply(2,5));
console.log(divide(2,5));

// 缓存
require('./test-module-3')();