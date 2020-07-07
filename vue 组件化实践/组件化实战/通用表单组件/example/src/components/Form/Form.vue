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
};
</script>
