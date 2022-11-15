import { createApp } from "vue"
import App from "./App.vue"
import "element-plus/dist/index.css"
import "./assets/stylesheets/index.scss"
import { createPinia } from "pinia"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
  .use(router)
  .mount("#app")
