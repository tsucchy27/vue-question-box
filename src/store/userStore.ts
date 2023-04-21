import { defineStore } from "pinia"
import { ref } from "vue";

export const useUserStore = defineStore('login_user', {
  state: () => ({
    id: 'null',
    password: 'null',
  }),

  getters: {
    id: (state) => state.id,
    password: (state) => state.password
  },

  actions: {

  },
  persist: {
    storage: sessionStorage
  }
})