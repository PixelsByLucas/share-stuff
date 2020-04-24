<template>
  <div class="homePage">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <p class="inline">Show stuff within</p>
          <v-select
            class="distance-select mx-4"
            outlined
            dense
            suffix="km"
            hide-details
            :items="distanceItems"
            v-model="searchDistance"
          ></v-select>
          <p class="inline">of</p>
          <a class="inline ml-4">your location</a>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="!fetchingItems">
        <v-col v-for="item in items" :key="item._id" xs="12" sm="4" md="3">
          <Item v-bind:item="item" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-progress-circular class="loading" indeterminate></v-progress-circular>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Item from "../components/Item";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Item
  },
  data() {
    return {
      distanceItems: [2.5, 5, 10, 20, 40, 80, 160],
      searchDistance: 10
    };
  },
  computed: {
    ...mapState({
      items: state => state.items.allItems,
      fetchingItems: state => state.items.fetchingItems,
      isLoggedIn: state => state.users.me.isLoggedIn
    })
  },
  watch: {
    isLoggedIn(isLoggedIn) {
      if (!isLoggedIn) {
        this.$store.dispatch("getAllItems");
      }
    }
  },
  created() {
    this.$store.dispatch("getAllItems");
  }
};
</script>
<style lang="scss" scoped>
.inline {
  display: inline-block;
}
.loading {
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.distance-select {
  display: inline-block;
  width: 110px;
}
</style>
