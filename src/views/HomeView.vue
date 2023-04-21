<template>
  <v-btn @click="$router.push('/messages')" block class="bg-deep-orange-darken-2">受信箱</v-btn>
  <v-btn @click="$router.push('/mypage')" block color="orange-darken-1">マイページ</v-btn>
  <v-btn @click="$router.push('/')" block color="light-blue-darken-2">みんなの質問</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
