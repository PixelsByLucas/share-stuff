<template>
  <div class="rating">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-icon>mdi-thumb-up-outline</v-icon>
          <span>{{ ` ${rating.up}` }}</span>
        </v-col>
        <v-col cols="12" md="6">
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
