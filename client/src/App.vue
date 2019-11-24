<template>
  <v-app>
    <v-app-bar app dark></v-app-bar>
    <v-content>
      <!-- Routes should go here -->
      <HelloWorld />
    </v-content>
    <v-footer app dark absolute>
      <v-col class="text-center" cols="12">
        <strong>ShareStuff</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({})
};
</script>
