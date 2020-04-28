<template>
  <v-card class="borrow-modal">
    <v-row no-gutters justify="end">
      <v-btn class="close-button" v-on:click="$emit('close-dialog')" icon>
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-row dense no-gutters>
      <v-card-title>Request to Borrow</v-card-title>
    </v-row>
    <v-divider></v-divider>
    <v-row dense no-gutters>
      <v-card-subtitle>SUBTITLE!</v-card-subtitle>
    </v-row>
    <v-card-text>
      <v-form>
        <v-row dense no-gutters>
          <v-date-picker v-model="dates" color="#272727" range></v-date-picker>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
import { isEmail } from "validator";
import { mapState } from "vuex";

export default {
  name: "BorrowModal",
  props: ["itemDetail"],
  data() {
    return {
      dates: [new Date().toISOString().substr(0, 10)]
    };
  },
  computed: mapState({}),
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.borrow-modal {
  margin: 0 auto;
}
.close-button {
  margin: 1rem;
}
</style>
