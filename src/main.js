import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routes";
import pinia from "./stores";
import "./style.css";
createApp(App).use(ElementPlus).use(pinia).use(router).mount("#app");
