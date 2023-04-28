<template>
  <div class="login">
    <h1>ログイン</h1>
    <p>{{ $route.query.message }}</p>
    <text-body-1></text-body-1>
    <v-form @submit.prevent>
      <v-text-field v-model="id" label="ID" clearable variant="outlined"></v-text-field>
      <v-text-field v-model="pass" label="password" clearable variant="outlined"></v-text-field>
      <v-btn @click="login">ログイン</v-btn>
      <router-link to="/register">新規アカウント作成</router-link>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

export default defineComponent({
  name: "loginView",

  // setup() {
  //   const store = useUserStore();
  //   console.log("[vue]store=>");
  //   console.log(store); //ストアのインスタンス確認する記述（後で削除）
  //   return {
  //     store,
  //     setValue: (id: string, pass: string) => {
  //       store.$patch({
  //         id: id,
  //         password: pass
  //       });
  //     }
  //   }
  // },
  data() {
    return {
      id: "",
      pass: ""
    }
  },

  methods: {
    login() {
      // this.$router.push('/')
      var url: string = "http://localhost:3000/login";
      var params = {
        id: this.id,
        password: this.pass
      };
      axios.post(url, params)
        .then((res) => {
          // ログイン成功
          console.log("[vue]res=>");
          console.log(res);
          // this.setValue(params.id, params.password);
          this.$cookies.set('userId', this.id);
          console.log("[vue]cookies=>");
          console.log(this.$cookies.get('userId'));
          this.$router.push('/');
        })
        .catch((e) => {
          // ログイン失敗
          console.log("[vue]e=>");
          console.log(e);
          if(e.response.data.error == "unfilled"){
            // 未入力時の処理
            this.$router.push({
              path: '/login',
              query: {
                message: "未入力項目があります。"
              }
            });
          }
          else if(e.response.data.error == "unregistered") {
            // ID未登録時の処理
            this.$router.push({
              path: '/login',
              query: {
                message: "未登録のIDです。"
              }
            });
          }else if(e.response.data.error == "incorrect") {
            // パスワード間違い時の処理
            this.$router.push({
              path: '/login',
              query: {
                mesasage: "パスワードが間違っています。"
              }
            });
          }else {
            // 予期せぬエラー
            this.$router.push({
              path: '/login',
              query: {
                message: '何かが壊れた'
              }
            });
          }
        })
        .finally(function() {
          // 常に実行する処理
        })
    }
  },
});
</script>