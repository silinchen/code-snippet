function fn1() {
    console.log(1)
    console.log(this, arguments)
}

function fn2() {
    console.log(2)
}

Function.prototype.call = function(context) {
    context = context ? Object(context) : window
    context.fn = this
    let args = []
    for (let i = 0; i < arguments.length; i++) {
        args.push(`arguments[${i}]`)
    }
    let r = eval(`context.fn(${args})`)
    delete context.fn
    return r
}

// fn1.call()
// fn1.call('hello', '1', 2)
// fn1.call.call.call(fn2)