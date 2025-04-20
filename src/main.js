import "./assets/css/main.css";
import "./assets/css/tailwind.css";
import router from "./routers/index.router";
import { createApp } from "vue";
import ui from "@nuxt/ui/vue-plugin";
import App from "./App.vue";

const app = createApp(App);

app.use(ui);
app.use(router);

app.mount("#app");
