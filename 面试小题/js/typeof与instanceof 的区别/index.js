// typeof 和 instanceof 的区别？

// 1）typeof 可以校验原始数据类型，原始数据类型有 6 中
// 分别是 number、string、boolean、null、undefined、symbol
// 其中有一些特殊的：typeof null === 'object'
console.log(typeof null)

// 2）当用 typeof 去校验引用类型的时候，无法正确区别各种类型。
// array 、object 、正则 RegExp、函数 function() {}
// 如果是函数会返回 function，其他的都返回 object，无法识别不同的类型
console.log(typeof []) // object
console.log(typeof {}) // object
console.log(typeof new RegExp(/a/)) // object
console.log(typeof function() {}) // function

// 可以利用 Object 原型链上的 toString 去识别
console.log(Object.prototype.toString.call([])) // [object Array]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call(new RegExp(/a/))) // [object RegExp]
console.log(Object.prototype.toString.call(function() {})) // [object Function]

// Object.prototype.toString 只能识别已经存在的类型。
// 但无法识别自定义的类型实例，例如：
class A{}
let a = new A()
console.log(Object.prototype.toString.call(a)) // [object Object]

// instanceof
console.log([] instanceof Array) // true
console.log([] instanceof Object) // true
// 上面的操作等价于下面的操作
console.log([].__proto__ === Array.prototype) // true
console.log([].__proto__.__proto__ === Object.prototype) // true

// 基于上面的操作，可以自行实现一个 instanceof
class A{}
let a = new A()
function instanceOf(A, B) {
    B = B.prototype
    A = A.__proto__
    /**
     * 利用循环不停的取 __proto__ 的值，比较它是否等于第二个参数的原型
     */
    while(true) {
        // Object.prototype.__proto__ === null
        // 如果 A 等于 null，说明原型链到尽头了
        if (A === null) {
            return false
        }
        // 如果原型链匹配上，说明 A 是 B 的实例
        if (A === B) {
            return true
        }
        // 如果没有到头，也没有匹配上，则继续取 .__proto__ 继续比较
        A = A.__proto__
    }
}

console.log(instanceOf(a, A)) // true
console.log(instanceOf(a, Object)) // true
console.log(instanceOf(a, Array)) // false

// instanceof 无法校验原始类型
let str = 'hello'
console.log(str instanceof String) // false
// 如果需要 instanceof 可以校验原始类型，需要对它进行一些修改
// 接下来先了解一下 Symbol.hasInstance
// 上面的操作等价于下面这个操作，使用 instanceof 时内部是调用了这个方法
console.log(String[Symbol.hasInstance](str)) // false

class ValidateStr {
    static [Symbol.hasInstance](x) {
        return typeof x === 'string'
    }
}
console.log(ValidateStr[Symbol.hasInstance]('hello')) // true
console.log('hello' instanceof ValidateStr) // true
// 改写了 Symbol.hasInstance 静态方法后，instanceof 的行为也跟着修改了

// 最后一种识别实例类型的方法是找对象的 constructor
