<template>
  <div class="message">
    <h1 class="text-3xl">受信箱</h1>
    <question-card v-for="(item, index) in messages" :key="index" :ques="item" />
  </div>
</template>
    
<script lang="ts">

import { defineComponent } from "vue";
import QuestionCard from "../components/QuestionCard.vue"
import axios from "axios";

export default defineComponent({
  name: "MessageView",

  components: {
    QuestionCard
  }, 

  mounted() {
    axios.get('http://localhost:3000/api/messages')
      .then(res => {
        this.messages = res.data;
      })
      .catch(err => {
        console.log("メッセージが取得できませんでした。");
        console.log(err);
      })
  },

  data() {
    return {
      messages: []
    }
  },

  methods: {

  },
});
</script>