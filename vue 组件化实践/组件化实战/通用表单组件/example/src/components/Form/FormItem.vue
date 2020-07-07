<template>
  <div>
    <!-- label -->
    <label v-if="label">{{ label }}</label>
    <!-- 插槽，用于包裹 Input 等组件 -->
    <slot></slot>
    <!-- 校验信息显示 -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      error: "", // 保持校验信息，error 为空说明校验通过
    };
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 当前的规则是什么
      // 当前的值是什么 
    },
  },
};
</script>
