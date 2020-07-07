# Vue组件之间的通信方式

[TOC]

## props

父给子传值

```vue
// parent 组件中传值
<Helloworld msg="Welcome to Your Vue.js App" />

// child 组件中接收
props: {msg: string}
```



## 自定义事件

子给父传值

```vue
// child 组件中触发事件
this.$emit('add', good)

// parent 组件中监听事件
<Cart @add="cartadd($event)" />
```



## 事件总线/eventbus

任意两个组件之间传值常用事件总线 或 vuex的方式。

```javascript
// Bus：事件派发、监听和回调管理
class Bus {
	constructor(){
        this.callbacks = {}
    }
    $on(name, fn){
        this.callbacks[name] = this.callbacks[name] || []
        this.callbacks[name].push(fn)
    }
    $emit(name, args){
        if(this.callbacks[name]){
            this.callbacks[name].forEach(cb => cb(args))
        }
    }
}
// main.js
Vue.prototype.$bus = new Bus()
// child1
this.$bus.$on('foo', handle)
// child2
this.$bus.$emit('foo')
```

> 实践中通常使用 Vue 替代 Bus，因为 Vue 已经实现了相应接口



## vuex

创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更。



## $parent/$root

兄弟组件之间通信可通过共同祖辈搭桥，$parent 或 $root

```javascript
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foot')
```



## $children

父组件可以通过 `$children` 访问子组件实现父子通信

```javascript
// parent
this.$children[0].xx = 'xxx'
```

> 注意：`$children` 不能保证子元素顺序



## $attrs/$listeners

[文档](https://cn.vuejs.org/v2/api/#vm-attrs)

### $attrs

包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 ( `class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( `class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。

```vue
// child：并未在props中声明 foo
<p>{{$attrs.foo}}</p>

// parent
<HelloWorld foo="foo" />
```



### listeners

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

```vue
// parent
<Child @click="onClick" />

onClick() {
	console.log('来自 parent 的回调函数处理', this)
}

// child：$listeners 会被展开并监听
<div v-on="$listeners">child</div>
```

> 在 child 中点击 div，可以触发 parent 中设置的 click 事件，并且 this 指向 parent 组件。
>
> 应用场景：在创建更高层次的组件时，在父（祖辈）级组件里设置监听事件，然后再子（孙）级组件里面去展开监听。在开发通用组件时很有应用价值。



## refs

获取子节点引用

```
// parent
<HelloWorld ref="hw"/>

mounted() {
	this.$refs.hw.xx = 'xxx'
}
```



## provide/inject

[文档](https://cn.vuejs.org/v2/api/#provide-inject)

能够实现祖先和后代之间传值。

`provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

```javascript
// ancestor：父级组件提供 'foo'
provide() {
	return {foo: 'foo'}
}

// descendant：子组件注入 'foo'
inject: ['foo']
```

> 理论上这里传的值是单向数据流，所以不要去改动它，不然可能会导致报错。

