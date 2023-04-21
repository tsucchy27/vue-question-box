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
              <router-link v-if="item.id!=3" :to="item.url">{{ item.name }}</router-link>
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

export default defineComponent({
  name: "App",

  data() {
    return {
      logined: false,
      drawer: false,
      menuItems: [
        {id: 1, name: 'ホーム', url: '/'},
        {id: 2, name: 'マイページ', url: '/mypage'},
        {id: 3, name: '受信箱', url: 'http://localhost:3000/messages'},
        {id: 4, name: '送る', url: '/send'},
        {id: 5, name: 'ログイン', url: '/login'},
        {id: 99, name: 'test', url: '/test'}
      ]
    };
  },
});
</script>
