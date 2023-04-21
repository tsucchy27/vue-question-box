<template>
  <div class="mypage">
    <h1>マイページ</h1>
    <router-link to="/">HOME</router-link>
    <v-btn @click="testSetValue">[testBTN]set value</v-btn>
    <v-btn @click="testResetValue">[testBTN]reset value</v-btn>
    <v-form>
      <v-text-field v-model="localParam.id" :value="loginAccount.id" label="ID"></v-text-field>
      <v-text-field v-model="localParam.email" :value="loginAccount.email" label="Eメール"></v-text-field>
      <v-text-field v-model="localParam.password" :value="loginAccount.password" label="パスワード"></v-text-field>
      <v-btn @click="login">変更</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from 'vuex'

export default defineComponent({
  name:"mypage",
  setup() {
    const store = useStore()
    return {
      loginAccount: computed(() => store.state.loginAccount),
      login: () => store.dispatch("login")
    }
  },
  data() {
    return {
      localParam: {
        id: '',
        email: '',
        password: ''
      },
      avatarImg: '',
    }
  },
  methods: {
    testSetValue() {
      localStorage.setItem("id", "tarou01")
      localStorage.setItem("email", "tarou01@gmail.com")
      localStorage.setItem("password", "pass01")
      console.log(`localStorage= id:${localStorage.getItem("id")} email:${localStorage.getItem("email")} pass:${localStorage.getItem("password")}`)
    },
    testResetValue() {
      localStorage.setItem("id", "")
      localStorage.setItem("email", "")
      localStorage.setItem("password", "")
      console.log(`localStorage= id:${localStorage.getItem("id")} email:${localStorage.getItem("email")} pass:${localStorage.getItem("password")}`)
    }
  }
});
</script>