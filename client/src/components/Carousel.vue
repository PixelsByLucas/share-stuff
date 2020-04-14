<template>
  <v-carousel hide-delimiters>
    <v-carousel-item v-for="(image, i) in images" :key="`carousel${i}`" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: "Carousel",
  props: ["images"]
};
</script>
<style lang="sass" scoped>

</style>