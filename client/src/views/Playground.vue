<template>
  <div class="home">
    <DistanceBar />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import DistanceBar from "@/components/DistanceBar.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    DistanceBar
  }
};
</script>
