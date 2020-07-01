function Animal(type) {
    this.type = type; // 实例上的属性
    // 如果当前构造函数返回的是一个引用类型，需要把这个对象/函数返回
    return { name: 'new' }
}

Animal.prototype.say = function() {
    console.log('say')
}


function mockNew(){
    // Constructor => Animal，shift 操作会取出第一位元素，剩余的 arguments 元素就是 new 的时候传入的参数
    let Constructor = [].shift.call(arguments)
    let obj = {} // 返回的结果，不能使用 Object.create(null)，因为后者生成的是一个没有原型链的空对象
    obj.__proto__ = Constructor.prototype // 继承了原型上的方法
    let r = Constructor.apply(obj, arguments)
    return r instanceof Object ? r : obj
}

// let animal = new Animal('哺乳类')
let animal = mockNew(Animal, '哺乳类')

console.log(animal)
console.log(animal.type)
animal.say()
// console.log(animal.__proto__ == Animal.prototype)

/**
 * Animal 是类
 * animal 是类的实例
 * animal 上的 __proto__ 指向 Animal.prototype
 * 即 animal.__proto__ = Animal.prototype
 */