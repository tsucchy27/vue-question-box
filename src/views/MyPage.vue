<template>
  <div class="mypage">
    <h1>マイページ</h1>
    <router-link to="/">HOME</router-link>
    <v-form>
      <v-text-field v-model="localParam.userid" :value="localParam.userid" label="ID"></v-text-field>
      <v-text-field v-model="localParam.email" :value="localParam.email" label="Eメール"></v-text-field>
      <v-btn @click="setValue">変更</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import axios from "axios";

export default defineComponent({
  name:"mypage",

  mounted() {
    axios.get('http://localhost:3000/api/mypage')
      .then(res => {
        this.localParam = res.data;
      })
      .catch(err => {
        console.log("メッセージが取得できませんでした。");
        console.log(err);
      })
  },

  data() {
    return {
      localParam: {
        userid: '',
        email: '',
      },
      avatarImg: '',
    }
  },

  methods: {
    setValue() {

    }
  }
});
</script>