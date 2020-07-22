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
  inject: { form: "form" },
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

      // 通知父级执行校验
      this.$parent.$emit("validate");
    },
  },
};
</script>
