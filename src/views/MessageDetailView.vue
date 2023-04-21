<template>
  <div class="message-detail">
    <router-link to="/messages">受信箱に戻る</router-link>
    <h2 class="text-3xl">タイトル</h2>
    <p>{{ question.title }}</p>
    <h2 class="text-3xl">テキスト</h2>
    <p>{{ question.text }}</p>
    <h2 class="text-3xl">投稿日時</h2>
    <p>{{ question.created_at }}</p>
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

  data() {
    return {
      question: {
        title: 'タイトル1',
        text: 'テキスト1',
        created_at: '更新日時：2023/04/11'
      }
    }
  },

  methods: {

  },
});
</script>