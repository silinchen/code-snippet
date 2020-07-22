<template>
  <div>
    <!-- label -->
    <label v-if="label">{{ label }}</label>
    <!-- 插槽，用于包裹 Input 等组件 -->
    <slot></slot>
    <!-- 校验信息显示 -->
    <p v-if="validateMessage">{{ validateMessage }}</p>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";

export default {
  inject: { form: "form" },
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      validateMessage: "", // validateMessage 为空说明校验通过
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
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
      return validator.validate(model, (errors) => {
        // 校验不通过时，返回一个错误信息对象，里面的 message 属性保存了 rules 里面设置的错误信息
        // 有错误信息将错误信息显示，否则置为空
        this.validateMessage = errors ? errors[0].message : "";
      });
    },
  },
};
</script>
