import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

Vue.config.productionTip = false;

// === LEAFLET CONFIG (mapping)
// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
// === === === === === === ===

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
