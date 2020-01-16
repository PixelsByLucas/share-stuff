<template>
  <!-- This vue can be used to test/build components in isolation from their context. -->
  <!-- Navigate to the /playground route in the browser to see the component -->
  <!-- Don't commit changes to this file -->
  <!-- <div class="playground">
    <h1>This is the playground page</h1>
  <div>-->
  <Map v-on:update-center="test" />
  <!-- Render the component you want to test here -->
  <!-- </div>
  </div>-->
</template>
<script>
import Map from "../components/Map";
// Import the component you want to work with here.
// Write all the dummy data the component needs to function here.
export default {
  name: "Playground",
  components: {
    Map
  },
  methods: {
    test(coords) {
      console.log(coords);
    }
  }
};
</script>
<style lang="scss" scoped></style>
