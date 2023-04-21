<template>
  <div>
    <v-card :title="ques.title" :subtitle="ques.created_at" :text="ques.text" class="max-w-xs">
      <v-card-actions>
        <v-btn><router-link to="/messages/detail">詳細</router-link></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
let id: number = 0
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionCard",

  props: {
    ques: {
      type: Object,
      required: true
    }
  },
  methods: {
      
  },
});
</script>