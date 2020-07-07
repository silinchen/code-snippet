<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Form :model="userInfo">
      <FormItem label="用户名">
        <Input v-model="userInfo.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="密码">
        <Input
          type="password"
          v-model="userInfo.password"
          placeholder="请输入密码"
        />
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
