<template>
  <div class="distance-bar">
    <v-row align="center">
      <v-toolbar>
        <v-col cols="12" sm="1">
          <v-spacer></v-spacer>
        </v-col>
        <v-col cols="12" sm="2">
          <v-toolbar-title>Stuff to borrow within:</v-toolbar-title>
        </v-col>
        <v-toolbar-items>
          <v-col cols="12" sm="3">
            <v-select :items="items" v-model="defaultSelected" outlined dense></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn text>of your location.</v-btn>
          </v-col>
        </v-toolbar-items>
      </v-toolbar>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    defaultSelected: "10km",
    items: ["5km", "10km", "25km", "50km"]
  })
};
</script>
<style scoped lang="scss">
.distance-bar {
  //   padding: 0 3% 0 3%;
  &__select {
    border-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>