<template>
  <v-card class="borrow-card">
    <v-row dense no-gutters>
      <v-card-title>Request to Borrow</v-card-title>
    </v-row>
    <v-divider></v-divider>
    <v-row dense no-gutters>
      <v-card-subtitle>
        {{`${itemDetail.name} from`}}
        <router-link
          :to="`/profile/${itemDetail.owner.username}`"
          tag="a"
        >{{itemDetail.owner.username}}</router-link>
      </v-card-subtitle>
    </v-row>
    <v-card-text>
      <v-form>
        <v-row dense no-gutters>
          <v-col cols="12">
            <v-dialog
              ref="pickUpDialog"
              v-model="pickUpDateModal"
              :return-value.sync="pickUpDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="pickUpDate"
                  outlined
                  label="Pick Up Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="pickUpDate" scrollable>
                <v-btn text color="primary" @mousedown="closeModal('pickUpDateModal')">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @mousedown="$refs.pickUpDialog.save(pickUpDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="12">
            <v-dialog
              ref="dropOffDateDialog"
              v-model="dropOffDateModal"
              :return-value.sync="dropOffDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dropOffDate"
                  outlined
                  label="Drop Off Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dropOffDate" scrollable>
                <v-btn text color="primary" @mousedown="closeModal('dropOffDateModal')">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @mousedown="$refs.dropOffDateDialog.save(dropOffDate)"
                >OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
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
  name: "ItemBorrow",
  data() {
    return {
      dateToday: new Date().toISOString().substr(0, 10),
      formPage: 0,
      subtitles: ["Select a pick up and drop off date."],
      pickUpDate: new Date().toISOString().substr(0, 10),
      dropOffDate: new Date().toISOString().substr(0, 10),

      pickUpDateModal: false,
      dropOffDateModal: false
    };
  },
  computed: {
    ...mapState({
      itemDetail: state => state.items.itemDetail
    }),
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
  methods: {
    handleSubmit() {
      console.log("Submitting");
    },
    closeModal(modalName) {
      console.log("modal", this[modalName], modalName);
      this[modalName] = false;
      console.log("modal", this[modalName], modalName);
    }
  }
};
</script>
<style lang="scss" scoped>
.borrow-card {
  max-width: 875px;
  margin: 16px auto;
}
</style>