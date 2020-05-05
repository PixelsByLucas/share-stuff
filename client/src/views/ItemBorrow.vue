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
        <v-row>
          <!-- pickup date -->
          <v-col cols="12" md="6">
            <v-dialog
              ref="pickUpDialog"
              v-model="pickUpDateModal"
              :return-value.sync="formValues.pickUpDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="formValues.pickUpDate"
                  outlined
                  label="Pick Up Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formValues.pickUpDate"
                :min="dateToday"
                scrollable
                header-color="#272727"
                color="#272727"
              >
                <v-btn text color="primary" @mousedown="closeModal('pickUpDateModal')">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @mousedown="$refs.pickUpDialog.save(formValues.pickUpDate)"
                >OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!-- drop off date -->
          <v-col cols="12" md="6">
            <v-dialog
              ref="dropOffDateDialog"
              v-model="dropOffDateModal"
              :return-value.sync="formValues.dropOffDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="formValues.dropOffDate"
                  outlined
                  label="Drop Off Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formValues.dropOffDate"
                :min="formValues.pickUpDate"
                scrollable
                header-color="#272727"
                color="#272727"
              >
                <v-btn text color="primary" @mousedown="closeModal('dropOffDateModal')">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @mousedown="$refs.dropOffDateDialog.save(formValues.dropOffDate)"
                >OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!-- pick up time -->
          <v-col cols="12" md="6">
            <v-dialog
              ref="pickUpTimeDialog"
              v-model="pickUpTimeModal"
              :return-value-sync="formValues.pickUpTime"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="convertTo12hr(formValues.pickUpTime)"
                  label="Pick Up Time"
                  prepend-icon="mdi-clock-outline"
                  outlined
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="pickUpTimeModal"
                v-model="formValues.pickUpTime"
                full-width
                header-color="#272727"
                color="#272727"
              >
                <v-btn text color="primary" @click="pickUpTimeModal = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.pickUpTimeDialog.save(formValues.pickUpTime)"
                >OK</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
          <!-- drop off time -->
          <v-col cols="12" md="6">
            <v-dialog
              ref="dropOffTimeDialog"
              v-model="dropOffTimeModal"
              :return-value-sync="formValues.dropOffTime"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="convertTo12hr(formValues.dropOffTime)"
                  label="Drop Off Time"
                  prepend-icon="mdi-clock-outline"
                  outlined
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="dropOffTimeModal"
                v-model="formValues.dropOffTime"
                full-width
                header-color="#272727"
                color="#272727"
              >
                <v-btn text color="primary" @click="dropOffTimeModal = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dropOffTimeDialog.save(formValues.dropOffTime)"
                >OK</v-btn>
              </v-time-picker>
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
      formValues: {
        pickUpDate: "",
        pickUpTime: "",
        dropOffDate: "",
        dropOffTime: ""
      },
      dateToday: new Date().toISOString().substr(0, 10),
      pickUpDateModal: false,
      pickUpTimeModal: false,
      dropOffDateModal: false,
      dropOffTimeModal: false
    };
  },
  computed: {
    ...mapState({
      itemDetail: state => state.items.itemDetail
    })
  },

  watch: {},
  methods: {
    convertTo12hr(time24Format) {
      let hours = Number(time24Format.substr(0, 2));
      let minutes = Number(time24Format.substr(3, 2));
      const amOrPm = hours >= 12 ? "PM" : "AM";

      if (hours < 1) {
        hours = 12;
      }

      if (hours > 12) {
        hours = hours - 12;
      }

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      return `${hours}:${minutes} ${amOrPm}`;
    },
    handleSubmit() {
      console.log("Submitting");
    },
    closeModal(modalName) {
      this[modalName] = false;
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