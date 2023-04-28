<template>
  <v-btn block class="bg-deep-orange-darken-2"><a :href="messages_url">受信箱</a></v-btn>
  <v-btn @click="$router.push('/mypage')" block color="orange-darken-1">マイページ</v-btn>
  <!--未実装のため押せないように設定-->
  <v-btn :disabled="true" @click="$router.push('/')" block color="light-blue-darken-2">みんなの質問</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      messages_url: `http://localhost:3000/messages?userid=${this.$cookies.get('userId')}`
    }
  }
});
</script>
