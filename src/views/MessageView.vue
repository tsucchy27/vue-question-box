<template>
  <div class="message">
    <h1 class="text-3xl">受信箱</h1>
    <question-card v-for="item in questionAry" :key="item.id" :ques="item" />
  </div>
</template>
    
<script lang="ts">
let id: number = 0

import { defineComponent } from "vue";
import QuestionCard from "../components/QuestionCard.vue"

export default defineComponent({
  name: "MessageView",

  components: {
    QuestionCard
  }, 

  data() {
    return {
      questionAry: [
        {id: id++, title: 'タイトル1', text: 'テキスト1', created_at: '更新日時：2023/04/11'},
        {id: id++, title: 'タイトル2', text: 'テキスト2', created_at: '更新日時：2023/04/10'},
        {id: id++, title: 'タイトル3', text: 'テキスト3', created_at: '更新日時：2023/04/09'}
      ]
    }
  },

  methods: {

  },
});
</script>