<template>
  <div class="stuffReview">
    <v-container fluid>
      <v-row no-gutters>
        <v-btn-toggle v-model="toggle" mandatory class="stuffReview__toggle">
          <v-btn>Stuff</v-btn>
          <v-btn>Reviews</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row v-if="isUserMe && toggle === 0" no-gutters>
        <v-btn class="stuffReview__newItem" to="/item-create">NEW ITEM</v-btn>
      </v-row>
      <v-row v-if="toggle === 0" class="stuff">
        <v-col v-for="item in items" :key="item._id" xs="12" sm="4" md="3">
          <Item v-bind:item="item" />
        </v-col>
      </v-row>
      <v-row v-if="toggle === 1" class="reviews">
        <ReviewList :reviews="reviews" />
      </v-row>
    </v-container>
    <div v-if="toggle === 1" class="reviews"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Item from "../components/Item";
import ReviewList from "../components/ReviewList";
export default {
  name: "StuffReviewList",
  components: {
    Item,
    ReviewList
  },
  props: ["items", "reviews"],
  data() {
    return {
      toggle: 0
    };
  },
  computed: mapState({
    isUserMe: state => state.users.profileUser.isUserMe
  })
};
</script>
<style lang="scss" scoped>
.stuffReview {
  &__newItem {
    margin: 12px 0;
  }
  &__toggle {
    margin: 12px 0;
  }
}
</style>
