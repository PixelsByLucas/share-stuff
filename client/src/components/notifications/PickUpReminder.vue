<template>
  <div class="PickUpReminder">
    <v-container fluid>
      <v-card :class="notification.status === `unseen` ? `card-unseen` : null">
        <div class="card-header-text">
          <div>
            <v-card-title class="title">{{`Pick Up Reminder`}}</v-card-title>
            <p class="no-margin">{{notificationDate}}</p>
          </div>
          <div>
            <span>{{userIsBorrower() ? "Lender: " : "Borrower: "}}</span>
            <router-link
              class="subtitle"
              :to="`/profile/${userIsBorrower() ? notification.lenderUsername : notification.borrowerUsername}`"
              tag="a"
            >{{userIsBorrower() ? notification.lenderUsername : notification.borrowerUsername}}</router-link>

            <p class="no-margin">
              <span>{{userIsBorrower() ? "Borowing " : "Lending "}}</span>
              <strong>{{notification.itemName}}</strong>
              <span>{{` for ${duration} ${days}`}}</span>
            </p>
          </div>
        </div>
        <div class="select-button">
          <v-btn icon @click="selectNotification()">
            <v-icon>{{ isNotificationSelected ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </div>

        <v-expand-transition>
          <div v-show="isNotificationSelected">
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <p>{{userIsBorrower() ? borrowerText : lenderText}}</p>
                  <v-text-field
                    disabled
                    :value="pickUpTime"
                    outlined
                    label="Pick Up Time"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col class="map-box" cols="6">
                  <LeafletMap
                    v-if="userIsBorrower()"
                    :coords="this.notification.itemLocation.primaryLocation"
                    :zoomProp="13"
                    marker="location"
                    :invalidate="shouldMapInvalidate"
                    markerTooltip="Item Location"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="actions">
              <v-btn icon large tile @click="deleteNotification()">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
  </div>
</template>
<script>
// import { SERVER_URL } from "../../apis/users";
import { dateFormat, getDurationInDays } from "../../utils/dateFormat";
import { mapState } from "vuex";
import LeafletMap from "../LeafletMap";
export default {
  name: "PickUpReminder",
  props: ["notification", "selectedNotification"],
  data() {
    return {
      shouldMapInvalidate: false
    };
  },
  components: {
    LeafletMap
  },
  methods: {
    deleteNotification() {
      this.$store.dispatch("deleteNotification", this.notification._id);
    },
    selectNotification() {
      this.$emit("select-notification", this.notification._id);
      this.shouldMapInvalidate = true;

      if (this.notification.status === "unseen") {
        this.$emit("notification-seen", this.notification._id);
      }
    },
    userIsBorrower() {
      return this.notification.borrowerUsername === this.username;
    }
  },
  computed: {
    borrowerText() {
      return `You're due to pick up ${this.notification.itemName} from ${this.notification.lenderUsername} in less than 24 hours.`;
    },
    lenderText() {
      return `${this.notification.borrowerUsername} is due to arrive to pick up ${this.notification.itemName} in less than 24 hours.`;
    },
    days() {
      let result = "days";
      if (this.duration === 1) {
        result = "day";
      }

      return result;
    },
    duration() {
      return getDurationInDays(
        this.notification.transaction.pickUpTime,
        this.notification.transaction.dropOffTime
      );
    },
    isNotificationSelected() {
      let result = false;
      if (this.selectedNotification === this.notification._id) {
        result = true;
      }

      return result;
    },
    notificationDate() {
      return dateFormat(this.notification.createdAt);
    },
    pickUpTime() {
      return dateFormat(this.notification.transaction.pickUpTime);
    },
    dropOffTime() {
      return dateFormat(this.notification.transaction.dropOffTime);
    },
    ...mapState({
      username: state => state.users.me.username
    })
  }
};
</script>
<style lang="scss" scoped>
.actions {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  padding: 16px;
}
.card-unseen {
  border-left: 4px solid #1976d2;
}
.card-header-text {
  padding: 16px 16px 0 16px;
  display: flex;
  justify-content: space-between;
}
.map-box {
  height: 300px;
}
.no-margin {
  margin: 0;
}
.select-button {
  padding: 0 16px 16px 16px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
.title {
  padding: 0;
  display: inline;
}
</style>