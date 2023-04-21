import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate"
import axios from "axios";
import VueAxios from "vue-axios";

loadFonts();

const pinia = createPinia();
pinia.use(createPersistedState());

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
