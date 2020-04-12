<template>
  <div class="homePage">
    <v-container fluid>
      <v-row v-if="!fetchingItems">
        <v-col v-for="item in items" :key="item._id" xs="12" sm="4" md="3">
          <Item v-bind:item="item" />
        </v-col>
      </v-row>
      <v-row v-else>LOADING</v-row>
    </v-container>
  </div>
</template>
<script>
// import { ITEM_CATEGORIES } from "../utils/constants";
import Item from "../components/Item";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Item
  },
  data() {
    return {};
  },
  computed: mapState({
    items: state => state.items.allItems,
    fetchingItems: state => state.items.fetchingItems
  }),
  methods: {},
  created() {
    this.$store.dispatch("getAllItems");
  }
};
</script>
<style lang="scss" scoped>
</style>
