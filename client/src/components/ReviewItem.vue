<template>
  <v-card class="review-item">
    <v-card-title>
      <v-icon class="review-item__icon" small :color="color">{{ icon }}</v-icon>
      <router-link
        class="review-item__link"
        :to="`/profile/${review.reviewerUsername}`"
        tag="a"
      >{{review.reviewerUsername}}</router-link>
    </v-card-title>
    <v-card-text>
      <p>{{ review.message }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "ReviewItem",
  props: ["review"],
  computed: {
    icon() {
      const { rating } = this.review;
      if (rating > 0) {
        return "mdi-thumb-up-outline";
      } else {
        return "mdi-thumb-down-outline";
      }
    },
    color() {
      const { rating } = this.review;
      if (rating > 0) {
        return "#37a175";
      } else {
        return "#cc4c49";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.review-item {
  &__link {
    font-size: 0.8rem;
  }
  &__icon {
    margin-right: 1rem;
  }
}
</style>
