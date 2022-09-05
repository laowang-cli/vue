import { createApp } from "vue"
import App from "./App.vue"
import "element-plus/dist/index.css"
import router from "./router"
import store from "./store"
import "./assets/stylesheets/index.scss"

createApp(App)
  .use(store)
  .use(router)
  .mount("#app")
