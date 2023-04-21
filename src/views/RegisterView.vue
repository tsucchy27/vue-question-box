<template>
  <div class="register">
    <h1>新規会員登録</h1>
    <p>{{ $route.query.message }}</p>
    <v-form>
      <v-text-field v-model="email" label="e-mail" clearable variant="outlined"></v-text-field>
      <v-text-field v-model="id" label="ID" clearable variant="outlined"></v-text-field>
      <v-text-field v-model="pass" label="password" clearable variant="outlined"></v-text-field>
      <v-btn @click="register">登録</v-btn>
      <router-link to="/login">ログイン画面に戻る</router-link>
    </v-form>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "RegisterView",

  data() {
    return {
      email: "",
      id: "",
      pass: ""
    }
  },

  methods: {
    register() {
      var url: string = "http://localhost:3000/register";
      var params = {
        email: this.email,
        id: this.id,
        password: this.pass
      };
      axios.post(url, params)
        .then((res) => {
          // 登録成功時
          console.log("[vue]res=>");
          console.log(res);
          this.$router.push('/');
        })
        .catch((e) => {
          // 登録失敗時
          if(e.response.data.error == "unfilled") {
            // 未入力項目があったとき
            this.$router.push({
              path: '/register',
              query: {
                message: "未入力項目があります。"
              }
            });
          } else if(e.response.data.error == "duplicate") {
            // 重複があったとき
            this.$router.push({
              path: '/register',
              query: {
                message: "既に使われているe-mailもしくはIDです。"
              }
            });
          } else {
            // 予期せぬエラーがあったとき
            this.$router.push({
              path: '/register',
              query: {
                message: "何かが壊れた。"
              }
            })
          }
        })
        .finally(function() {
          // 常に実行
        })
    }
  },
});
</script>