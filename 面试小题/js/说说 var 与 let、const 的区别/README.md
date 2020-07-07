# 说说 var 与 let、const 的区别

[阮一峰 es6 文档](https://es6.ruanyifeng.com/#docs/let)

##### 1. 变量提升

let、const 不存在变量提升
var 有变量提升

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```



##### 2. 暂时性死区

let、const 存在暂时性死区
var 没有暂时性死区

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```



##### 3. 不允许重复声明

```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```



##### 4. 全局作用域下 let 声明的变量不属于 window

```javascript
let a = 1
var b = 2
window.a // undefined
window.b // 2
```



##### 5. 块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

let、const 有块级作用域
var 没有块级作用域

```javascript
var tmp = new Date();

function f() {
  console.log(tmp); // 期望输出的是 new Date() 的值，实际上输出的是 undefined，变量提升导致。
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

> 使用 var 声明的变量，可能会内层变量可能会覆盖外层变量



`let` 实际上为 JavaScript 新增了块级作用域。

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```



es5 中如果需要块级作用域，需要使用匿名立即执行函数表达式（匿名 IIFE）实现

```javascript
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```



##### 6. const 声明是一个不变的常量

> `const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

