<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Form :model="userInfo" :rules="rules" ref="loginForm">
      <FormItem label="用户名" prop="username">
        <Input v-model="userInfo.username" placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input
          type="password"
          v-model="userInfo.password"
          placeholder="请输入密码"
        />
      </FormItem>
      <FormItem>
        <button @click="login">登录</button>
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
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
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
