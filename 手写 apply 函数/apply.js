function fn1() {
    console.log(1)
    console.log(this, arguments)
}

function fn2() {
    console.log(2)
    console.log(this, arguments)
}

Function.prototype.apply = function(context, args) {
    context = context ? Object(context) : window
    context.fn = this
    if (!args) {
        return context.fn()
    }
    let r = eval(`context.fn(${args})`)
    delete context.fn
    return r
}
// fn1.apply()
// fn1.apply('hello', [1,2,3])
// fn1.apply.apply.apply(fn2)