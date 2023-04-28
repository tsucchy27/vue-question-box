<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>質問箱</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="item in menuItems" :key="item.id">
            <v-list-item-title>
              <!--受信箱はバックエンドに飛ばす-->
              <a v-if="item.id==3" :href="item.url">{{ item.name }}</a>
              <!--ログアウト時はlogout()を発火-->
              <a v-else-if="item.id==6" :href="item.url" @click="logout">{{ item.name }}</a>
              <router-link v-else :to="item.url">{{ item.name }}</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
//let id: number = 0

import { defineComponent } from "vue";
import { useUserStore } from "@/store/userStore";

export default defineComponent({
  name: "App",

  // setup() {
  //   const store = useUserStore();
  //   return {
  //     store,
  //     getUserId: () =>  {
  //       store.$state.id;
  //     }
  //   }
  // },

  data() {
    return {
      logined: false,
      drawer: false,
      menuItems: [
        {id: 1, name: 'ホーム', url: '/'},
        {id: 2, name: 'マイページ', url: '/mypage'},
        {id: 3, name: '受信箱', url: `http://localhost:3000/messages?userid=${this.$cookies.get('userId')}`},
        {id: 4, name: '送る', url: '/send'},
        {id: 5, name: 'ログイン', url: '/login'},
        {id: 6, name: 'ログアウト', url: '/'},
        {id: 99, name: 'test', url: '/test'}
      ]
    };
  },

  methods: {
    logout() {
      // 保持されたユーザIDの削除
      this.$cookies.remove('userId');
      // 保持された質問情報の削除
      localStorage.removeItem('ques');
    }
  }
});
</script>
