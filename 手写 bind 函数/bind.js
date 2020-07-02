let obj = {
    name: 'silinchen'
}

function fn() {
    console.log(this.name)
}
// 使用 bind 函数绑定生成一个新的函数，修改原函数的 this 指向
let bindFn = fn.bind(obj)
bindFn() // silinchen