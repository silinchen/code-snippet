// mdn 文档: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// This的四种绑定规则
// 1.默认绑定
// 独立函数调用时， this 指向全局对象，如果使用严格模式，那么全局对象无法使用默认绑定， this 绑定至 undefined 并抛错（TypeError: this is undefined）
// 2.隐式绑定
// 当函数作为引用属性被添加到对象中，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象
// 3.显示绑定
// 运用apply call 方法，在调用函数时候绑定this，也就是指定调用的函数的this值
// 4.new绑定
// 就是使用new操作符的时候的this绑定
// 上述四条规则优先级由上到下依次递增。
let obj = {
    name: 'silinchen'
}

function fn(animal, color) {
    this.type = 'fn'
    console.log('this', this)
    console.log(`${this.name}养了一只${color}色的${animal}`)
}

// 1) bind 方法可以绑定 this 指向
// 2）bind 方法返回一个绑定后的函数（高阶函数）
// 3）如果绑定的函数被 new 了，当前函数的 this 就是当前的实例
// 4）new 出来的结果可以找到原有类的原型
Function.prototype.bind = function(context) {
    const that = this
    let bindArgs = Array.prototype.slice.call(arguments, 1) // ['猫']
    function fBound() {
        // 这里的 arguments 是返回的函数的 arguments，跟上面的不一样
        let args = Array.prototype.slice.call(arguments)
        // 将 bind 的时候传入的参数，与绑定函数执行时传入的参数合并
        return that.apply(this instanceof fBound ? this : context, bindArgs.concat(args))
    }
    // 通过将 fBound 的原型指向原函数的原型，实现原型链的共用
    // fBound.prototype = this.prototype
    // 但上面这种简单粗暴的将两个方法的原型指向同一个地方方法可能不太好
    // 可以修改成通过一个中间函数进行关联
    function Fn() {} // Object.create 原理
    Fn.prototype = this.prototype
    fBound.prototype = new Fn()
    return fBound
}


// 1) 简单使用 bind 函数绑定生成一个新的函数，修改原函数的 this 指向
// let bindFn = fn.bind(obj)
// bindFn() // silinchen

// 2）偏函数、curring、柯里化
// let bindFn = fn.bind(obj, '猫')
// bindFn('白') // silinchen养了一只白色的猫

// 3）作为构造函数，使用 new 操作符构造
fn.prototype.flag = '哺乳类'
let bindFn = fn.bind(obj, '猫')
let instance = new bindFn('白')
console.log(instance.flag)

