<template>
  <div class="rating">
    <v-container fluid class="pa-0">
      <v-row align="center" no-gutters>
        <v-col cols="6" class="rating__up pa-0">
          <v-icon :size="getIconSize">mdi-thumb-up-outline</v-icon>
          <span>{{ ` ${rating.up}` }}</span>
        </v-col>
        <v-col cols="6" class="rating__down pa-0">
          <v-icon :size="getIconSize">mdi-thumb-down-outline</v-icon>
          <span>{{ ` ${rating.down}` }}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Rating",
  props: ["rating", "size"],
  data() {
    return {};
  },
  computed: {
    getIconSize() {
      switch (this.size) {
        case "small":
          return 20;
        case "medium":
          return 30;
        case "large":
          return 50;
        default:
          return 25;
      }
    }
  }
};
</script>
<style lang="scss">
.rating {
  &__up {
    text-align: center;
  }
  &__down {
    text-align: center;
  }
}
</style>
