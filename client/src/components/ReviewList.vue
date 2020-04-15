<template>
  <v-container fluid>
    <v-row v-for="review in reviews" :key="review._id">
      <v-col xs="12" sm="9" md="9">
        <ReviewItem v-bind:review="review" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ReviewItem from "../components/ReviewItem";

export default {
  name: "ReviewList",
  props: ["reviews"],
  components: {
    ReviewItem
  }
};
</script>
<style lang="sass" scoped>

</style>