# Vue 组件化实践通用表单组件开发



## 需求分析

*仿 [Element UI 的 Form 表单](https://element.eleme.cn/#/zh-CN/component/form)*

* 实现 Form 表单组件
  * 指定数据（model）、检验规则（rules）
* 实现 FormItem 组件
  * 执行校验
  * 显示错误信息
* 实现 Input 组件
  * 维护数据



> 高内聚、低耦合
>
> 例如这里要实现的 Input 的功能要单一，如果功能过多，可复用性就低。



## 搭建 Form 表单基础架构

接下来，从0开始实现，先简单搭建基础的框架。

使用 vue-cli 创建一个最简单的脚手架，基于脚手架进行修改。

`vue create example`

### 实现 Input 组件

使用 input 标签，结合 `:value` 和 `@input` 实现双向数据绑定

创建 src/components/Form/Input.vue

```vue
<template>
  <div>
    <!-- 自定义组件双向绑定： :value @input -->
    <!-- 使用 v-bind="$attrs" 展开 $attrs -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  name: "Input",
  inheritAttrs: false, // 设置为 false，避免设置到 Input 组件上的属性设置到组件的根元素上（这里的 div）
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(e) {
      // props 是单向数据流，所以，不要直接去修改 value 的值
      // 派发一个 input 事件即可
      this.$emit("input", e.target.value);
    },
  },
};
</script>

```

> 这里用到一个技巧，使用 vue 的 [$attrs](https://cn.vuejs.org/v2/api/#vm-attrs) 特性。
>
> `$attrs` 是在 `Input` 组件上绑定的并且不最为 prop 被识别的属性集合 (`class` 和 `style` 除外)。例如，后面用到的 `placehodler` 等属性。
>
> 这些属性默认是绑定到 `Input` 组件的根元素上（最外层的 div）。
>
> 通过 `v-bind="$attrs"`，可以将 `$attrs` 展开到 `input` 标签上，这样，在 `Input` 组件上设置的属性就会到` input` 标签上去。
>
> 并且通过设置 `inheritAttrs: false`，可以将避免属性设置到根元素上。

### 使用 Input 组件

修改 src/App.vue

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Input v-model="userInfo.username"/>
    <Input type="password" v-model="userInfo.password"/>
  </div>
</template>

<script>
import Input from './components/Form/Input.vue'

export default {
  name: 'App',
  components: {
    Input
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

```



### 实现 FormItem 组件

1. 插槽，用于包裹 Input 等组件
2. label 标签
3. 校验信息显示

创建 src/components/Form/FormItem.vue

```vue
<template>
  <div>
      <!-- label -->
      <label v-if="label">{{label}}</label>
      <!-- 插槽，用于包裹 Input 等组件 -->
      <slot></slot>
      <!-- 校验信息显示 -->
      <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            error: '' // 保持校验信息，error 为空说明校验通过
        }
    }
}
</script>
```



### 使用 FormItem 组件

修改 src/App.vue，在原先 `Input` 组件外面包裹一层 `FormItem`

```vue
<FormItem label="用户名">
	<Input v-model="userInfo.username"/>
</FormItem>
<FormItem label="密码">
	<Input type="password" v-model="userInfo.password"/>
</FormItem>

// 引入组件 
import FormItem from './components/Form/FormItem.vue'

// 注册组件
components: {
	FormItem,
}

```



### 实现 Form 组件

创建 src/components/Form/Form.vue

```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true, // 必填
    },
    rules: {
      type: Object,
    },
  },
};
</script>
```

> model 保存着表单的数据，之所以要将数据放在这里，是因为这样方便后面统一处理表单数据，例如对数据进行校验。

### 使用 From 组件

修改 App.vue，在 `FormItem` 组件外面包裹一层 `From` 组件

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Form :model="userInfo">
      <FormItem label="用户名">
        <Input v-model="userInfo.username" />
      </FormItem>
      <FormItem label="密码">
        <Input type="password" v-model="userInfo.password" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Input from "./components/Form/Input.vue";
import FormItem from "./components/Form/FormItem.vue";
import Form from "./components/Form/Form.vue";

export default {
  name: "App",
  components: {
    Input,
    FormItem,
    Form,
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
};
</script>
```



到此，基础的框架搭建完成。接下来开始实现核心的功能。



## 实现 Form 组件上的数据传递向下传递

表单的数据是绑定在 From 组件的 model 属性上的，那么 Input 组件要使用的时候，如何取到值呢？

### 使用 Provide/Inject 进行传值

[Provide/Inject](https://cn.vuejs.org/v2/api/#provide-inject) 是 vue 通信方式之一，多用于通用组件开发中

修改 src/components/Form/Form.vue

```vue
...
provide() {
	form: this // 将组件本身向下传递
}
...
```

> Element UI 的 [Form](https://github.com/ElemeFE/element/blob/dev/packages/form/src/form.vue) 组件，在传递数据的时候，直接通过使用 `provide` 简单粗暴的将组件本身向下传递。Form 表单里的其他组件就可以通过注入这个 `form` 属性来获取 Form 组件上的数据。



接下来在 `FormItem`、`Input` 组件里可以通过 `inject` 注入 `form` 属性。



## 数据校验

数据校验由 `Input` 组件触发

修改 src/components/Form/Input.vue

```javascript
onInput(e) {
    ...
    // 通知父级执行校验
    this.$parent.$emit("validate");
}
```

> 这里使用 `this.$parent.$emit` 是因为要在父级组件 `FormItem` 里面去监听相应事件



`FormItem` 组件监听校验事件

修改 src/components/Form/FormItem.vue

```javascript
props: {
	...
    prop: {
		type: String,
    },
},
mounted() {
    this.$on("validate", () => {
        this.validate();
    });
},
methods: {
	validate() {
        // 当前的规则是什么
        this.form.rules[this.prop];
        // 当前的值是什么
        this.form.model[this.prop];
	},
},
```

> 1. 增加 `prop` 属性（也就是为什么在使用 FromItem 的时候需要传入 prop="xxx"），用来从 `rules` 跟 `model` 中取到对应项的数据
>2. 绑定监听 validate 事件，这里使用 mounted 而不是 created 是因为这里可以确保挂载完成子组件已存在
> 3. 实现 validate 方法，这里需要用到 [async-validator](https://github.com/yiminghe/async-validator) 实现异步的校验
> 4. 安装并添加 [async-validator](https://github.com/yiminghe/async-validator) 依赖：`npm install --save async-validator`



```javascript
validate() {
  // 当前的规则
  const rules = this.form.rules[this.prop];
  // 当前的值
  const value = this.form.model[this.prop];
  // 校验描述对象，校验规则
  const descriptor = {
    [this.prop]: rules,
  };
  // 传入规则，创建 AsyncValidaotr 实例
  const validator = new AsyncValidator(descriptor);
  // 校验源，要校验的数据
  const model = {
    [this.prop]: value,
  };
  // 通过 validator 实例校验数据是否符合规则
  validator.validate(model, (errors) => {
    // 校验不通过时，返回一个错误信息对象，里面的 message 属性保存了 rules 里面设置的错误信息
    // 有错误信息将错误信息显示，否则置为空
    this.validateMessage = errors ? errors[0].message : "";
  });
}
```



### 全局校验

例如在登录表单，点击登录按钮的时候，要对所有的表单项进行验证。

使用方法大概如下：

修改：src/App.vue

```
<Form :model="userInfo" :rules="rules" ref="loginForm">
	...
	<FormItem>
    	<button @click="login">登录</button>
    </FormItem>
</From>
```

表单增加 ref 属性 `ref="loginForm"`，并增加登录按钮

```javascript
methods: {
  login() {
    this.$refs["loginForm"].validate((valid) => {
      if (valid) {
        alert("submit");
      } else {
        console.log("error submit!");
        return false;
      }
    });
  },
},
```

增加 `login` 方法，通过 `refs` 取得表单并调用表单的 `validate` 方法进行全局校验，`validate` 接收一个回调函数，用来接收验证的结果并根据结果做相应处理。



修改 src/components/Form/Form.vue，增加 `validate` 方法

```

```





