import Vue from "vue"
import Vuetify from "vuetify/lib"
import KarmaIcon from "../assets/KarmaIcon"

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    values: {
      karma: {
        component: KarmaIcon,
        props: {
          name: "karma",
          dark: false
        }
      },
      karmaDark: {
        component: KarmaIcon,
        props: {
          name: "karmaDark",
          dark: true
        }
      }
    }
  }
})
