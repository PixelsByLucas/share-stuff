<template>
  <div class="rating">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6" class="rating__up">
          <v-icon>mdi-thumb-up-outline</v-icon>
          <span>{{ ` ${rating.up}` }}</span>
        </v-col>
        <v-col cols="12" md="6" class="rating__down">
          <v-icon>mdi-thumb-down-outline</v-icon>
          <span>{{ ` ${rating.down}` }}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Rating",
  props: ["rating"]
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
