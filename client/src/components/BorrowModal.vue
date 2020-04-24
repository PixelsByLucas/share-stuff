<template>
  <v-card class="borrow-modal">
    <v-row>
      <v-spacer></v-spacer>
      <v-btn v-on:click="$emit('close-dialog')" icon>
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-card-title>Borrow</v-card-title>
    <div></div>
  </v-card>
</template>

<script>
import { isEmail } from "validator";
import { mapState } from "vuex";

export default {
  name: "BorrowModal",
  data() {
    return {};
  },
  computed: mapState({}),
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.borrow-modal {
  padding: 3rem 4rem 3rem 4rem;
  margin: 0 auto;
}
</style>
