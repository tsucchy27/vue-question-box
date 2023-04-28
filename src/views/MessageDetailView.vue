<template>
  <div class="message-detail">
    <router-link to="/messages">受信箱に戻る</router-link>
    <h1 class="mx-auto">質問詳細ページ</h1>
    <v-card :title="ques.title" :subtitle="ques.created_at" :text="ques.text"></v-card>
  </div>
</template>
    
<script lang="ts">

import { defineComponent } from "vue";
import QuestionCard from "../components/QuestionCard.vue"

export default defineComponent({
  name: "MessageView",

  components: {
    QuestionCard
  }, 

  mounted() {
    if (localStorage.getItem('ques') != null) {
      // @ts-ignore: ts2345
      this.ques = JSON.parse(localStorage.getItem('ques'));
    }
  },

  data() {
    return {
      ques: {
        title: "",
        text: "",
        created_at: ""
      }
    }
  },

  methods: {

  },
});
</script>