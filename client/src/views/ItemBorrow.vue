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
      <v-form v-model="formValid" ref="form">
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
                  required
                  readonly
                  v-on="on"
                  :rules="startDateRules"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formValues.pickUpDate"
                :min="dateToday"
                :max="formValues.dropOffDate"
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
                  required
                  readonly
                  v-on="on"
                  :rules="endDateRules"
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
                  required
                  readonly
                  v-on="on"
                  :rules="startTimeRules"
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
                  required
                  readonly
                  v-on="on"
                  :rules="endTimeRules"
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
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" sm="6">
            <h3 class="duration">
              Requesting to borrow for
              <span class="bold">{{`${duration()} ${days()}`}}</span>
            </h3>
          </v-col>
          <v-col cols="12" sm="6">
            <h3 class="total">
              <span>{{`Total: `}}</span>
              <v-icon class="karma-icon" color="black" v-text="'$vuetify.icons.karmaDark'"></v-icon>
              <span class="bold">{{totalCost()}}</span>
            </h3>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-textarea
              outlined
              :label="`Message to ${itemDetail.owner.username}`"
              v-model="formValues.message"
              :rules="messageRules"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="card-actions">
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn v-on:click="handleSubmit" :disabled="fetchingTransaction ? true : false">SUBMIT</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import {
  combineDateAndTimeToUTC,
  getVuetifyDateFormat
} from "../utils/dateFormat";
import router from "../router";

export default {
  // TODO: set min/max times when date is the same
  name: "ItemBorrow",
  data() {
    return {
      formValues: {
        pickUpDate: "",
        pickUpTime: "",
        dropOffDate: "",
        dropOffTime: "",
        message: ""
      },
      formValid: false,
      messageRules: [
        v => v.length < 1000 || "Message must be less than 1000 character"
      ],
      startDateRules: [v => !!v || "Pick up date is required"],
      endDateRules: [
        v => !!v || "Drop off date is required",
        () =>
          this.totalCost() < this.$store.state.users.me.karma ||
          "Not enough Karma"
      ],
      startTimeRules: [
        v => !!v || "Pick up time is required",
        () =>
          this.validatePickupNotBeforeNow() ||
          "Pick up time must not be earlier than the present"
      ],
      endTimeRules: [
        v => !!v || "Drop off time is required",
        () =>
          this.validateDropOffNotBeforePickUp() ||
          "Drop off cannot be before pick up"
      ],
      dateToday: getVuetifyDateFormat(new Date()),
      pickUpDateModal: false,
      pickUpTimeModal: false,
      dropOffDateModal: false,
      dropOffTimeModal: false
    };
  },
  computed: {
    ...mapState({
      itemDetail: state => state.items.itemDetail,
      fetchingTransaction: state => state.users.fetchingTransaction,
      itemId: state => state.items.itemDetail._id,
      lenderId: state => state.items.itemDetail.ownerId,
      myKarma: state => state.users.me.karma
    })
  },
  methods: {
    validatePickupNotBeforeNow() {
      let result = true;
      const { pickUpDate, pickUpTime } = this.formValues;

      if (pickUpDate && pickUpTime) {
        const pickUp = combineDateAndTimeToUTC(
          pickUpDate,
          pickUpTime
        ).toISOString();

        if (new Date(pickUp) <= new Date()) {
          result = false;
        }
      }

      return result;
    },
    validateDropOffNotBeforePickUp() {
      let result = true;
      const {
        pickUpDate,
        pickUpTime,
        dropOffDate,
        dropOffTime
      } = this.formValues;

      if (pickUpDate && pickUpTime && dropOffDate && dropOffTime) {
        const pickUp = combineDateAndTimeToUTC(
          pickUpDate,
          pickUpTime
        ).toISOString();
        const dropOff = combineDateAndTimeToUTC(
          dropOffDate,
          dropOffTime
        ).toISOString();

        if (new Date(pickUp) >= new Date(dropOff)) {
          result = false;
        }
      }

      return result;
    },
    convertTo12hr(time24Format) {
      if (!time24Format) {
        return "";
      }

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
    totalCost() {
      return Number(this.itemDetail.price) * this.duration();
    },
    duration() {
      const { pickUpDate, dropOffDate } = this.formValues;
      let result = 0;

      if (pickUpDate && dropOffDate) {
        const timeDifference =
          new Date(dropOffDate).getTime() - new Date(pickUpDate).getTime();

        result = timeDifference / (1000 * 3600 * 24) + 1;
      }
      return result;
    },
    days() {
      let result = "days";
      if (this.duration() === 1) {
        result = "day";
      }
      return result;
    },
    handleSubmit() {
      if (this.formValid) {
        this.$store.dispatch("sendBorrowRequest", {
          lenderId: this.lenderId,
          itemId: this.itemId,
          message: this.formValues.message,
          pickUpTime: combineDateAndTimeToUTC(
            this.formValues.pickUpDate,
            this.formValues.pickUpTime
          ).toISOString(),
          dropOffTime: combineDateAndTimeToUTC(
            this.formValues.dropOffDate,
            this.formValues.dropOffTime
          ).toISOString()
        });
      } else {
        this.$refs.form.validate();
      }
    },
    closeModal(modalName) {
      this[modalName] = false;
    }
  },
  created() {
    // TODO: This works but I am getting type error in the console
    if (!this.$store.state.items.itemDetail) {
      router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.bold {
  font-weight: 800;
  color: black;
}
.borrow-card {
  max-width: 875px;
  margin: 16px auto;
}
.duration {
  text-align: center;
}
.total {
  text-align: center;
}
</style>