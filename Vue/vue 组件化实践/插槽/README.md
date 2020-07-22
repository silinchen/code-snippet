# 插槽

[文档](https://cn.vuejs.org/v2/guide/components-slots.html)

插槽语法是Vue 实现的内容分发 API，用于复合组件开发。该技术在通用组件库开发中有大量应用。



## 匿名插槽

```vue
// Comp1
<div>
	<slot></slot>
</div>

// parent
<Comp1>hello</Comp1>
```



## 具名插槽

将内容分发到子组件指定位置

```vue
// comp2
<div>
    <slot></slot>
    <slot name="content"></slot>
</div>

// parent
<Comp2>
    <!-- 默认插槽用default做参数 -->
    <template v-slot:default>具名插槽</template>
    <!-- 具名插槽用插槽名做参数 -->
    <template v-slot:content>内容...</template>
</Comp2>
```



## 作用域插槽

分发内容要用到子组件中的数据

子组件中将数据以属性的形式绑定到 slot 标签上，父组件中可以使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字。例如下例，将 插槽 prop 定义为 `slotProps`，然后就可以在父级作用域中使用子级

```vue
// comp3
<div>
	<slot :foo="foo"></slot>
</div>

// parent
<Comp3>
    <!-- 把v-slot的值指定为作用域上下文对象 -->
    <template v-slot:default="slotProps">
		来自子组件数据：{{slotProps.foo}}
    </template>
</Comp3>
```

