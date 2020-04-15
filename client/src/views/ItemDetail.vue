<template>
  <div>
    <v-container fluid v-if="!fetchingItems">
      <v-row>
        <v-col cols="6">
          <Carousel :media="itemDetail.media" :itemId="itemDetail._id" />
        </v-col>
        <v-col cols="6">
          <h2 class="item-title">{{itemDetail.name}}</h2>
          <p class="item-text">{{itemDetail.description}}</p>
          <v-divider class="divider"></v-divider>
          <v-row align="center" no-gutters>
            <span class="item-text item-text__cost">Cost:</span>
            <v-icon class="karma-icon" color="black" v-text="'$vuetify.icons.karmaDark'"></v-icon>
            <span>1000</span>
            <v-spacer></v-spacer>
            <v-btn class="nav__register-btn">BORROW</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-divider class="divider"></v-divider>
      </v-row>
      <v-row>
        <v-col cols="6">
          <!-- TODO: reviews here -->
          <ReviewList :reviews="reviews" />
        </v-col>
        <v-col cols="6">
          <!-- TODO: map here -->
          <LeafletMap />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-progress-circular class="loading" indeterminate></v-progress-circular>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

import Carousel from "../components/Carousel";
import ReviewList from "../components/ReviewList";
import LeafletMap from "../components/LeafletMap";
import { profileDummyData } from "../utils/dummyData";

export default {
  name: "ItemDetail",
  components: {
    Carousel,
    ReviewList,
    LeafletMap
  },
  data() {
    return {
      ...profileDummyData
    };
  },
  computed: {
    ...mapState({
      itemDetail: state => state.items.itemDetail,
      fetchingItems: state => state.items.fetchingItems
    })
  },
  created() {
    this.$store.dispatch("getItemDetail", this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.item-title {
  font-family: "Knewave", cursive;
  font-size: 3rem;
}
.item-text {
  font-family: "Roboto";
  &__cost {
    font-size: 1.5rem;
  }
}
.divider {
  margin-bottom: 1rem;
}
.loading {
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
</style>