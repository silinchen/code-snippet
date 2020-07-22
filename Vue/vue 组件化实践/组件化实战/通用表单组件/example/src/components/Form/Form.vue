<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true, // 必填
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      // 获取所有孩子 FromItem
      // 每个 item.validate 可能是异步的，最终返回一个 Promise，
      // tasks 是一个包含多个 Promise 的数组
      const tasks = this.$children
        .filter((item) => item.prop) // 过滤掉没有 prop 属性的 item，不然会发生错误
        .map((item) => item.validate());

      // 统一处理所有的 Promise 结果，
      // 如果全部校验通过，会进入 then，
      // 如果有校验失败的，会进入 catch
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>
