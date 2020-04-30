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
      <v-card-subtitle>{{subtitles[formPage]}}</v-card-subtitle>
    </v-row>
    <v-card-text>
      <v-form>
        <v-row dense no-gutters>
          <v-date-picker
            v-model="dates"
            color="#272727"
            range
            :min="dateToday"
            :selected-items-text="datePickerHeader"
          ></v-date-picker>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="card-actions">
      <v-row no-gutters>
        <v-btn v-on:click="handleSubmit">SUBMIT</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "BorrowItem",
  props: ["itemDetail"],
  data() {
    return {
      dateToday: new Date().toISOString().substr(0, 10),
      dates: [new Date().toISOString().substr(0, 10)],
      formPage: 0,
      subtitles: ["Select a pick up and drop off date."]
    };
  },
  computed: {
    ...mapState({}),
    datePickerHeader() {
      const moments = this.dates
        .map(date => moment(date))
        .sort((date1, date2) => date2 - date1);

      let numberOfDays =
        moments[0].diff(moments[moments.length - 1], "days") + 1;

      return `${numberOfDays} ${numberOfDays > 1 ? "days" : "day"}`;
    }
  },

  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>