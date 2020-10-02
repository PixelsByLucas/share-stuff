<template>
  <div class="borrow-request-expired">
    <v-container fluid>
      <v-card :class="notification.status === `unseen` ? `card-unseen` : null">
        <div class="card-header-text">
          <div>
            <v-card-title class="title">
              <span>Borrow Request - </span>
              <span class="status-expired">Expired</span>
            </v-card-title>
            <p class="no-margin">{{ notificationDate }}</p>
          </div>
          <div>
            <span>{{ ` from: ` }}</span>
            <router-link
              :to="`/profile/${notification.lenderUsername}`"
              tag="a"
            >
              {{ notification.lenderUsername }}
            </router-link>
            <p class="no-margin">
              <span>{{ `Requested to borrow ` }}</span>
              <strong>{{ notification.itemName }}</strong>
              <span>{{ ` for ${duration} ${days}` }}</span>
            </p>
          </div>
        </div>
        <div class="select-button">
          <v-btn icon @click="selectNotification()">
            <v-icon>{{
              isNotificationSelected ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </div>
        <v-expand-transition>
          <div v-show="isNotificationSelected">
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <p>
                    {{
                      `Your request to borrow ${notification.itemName} from ${notification.lenderUsername} has expired because ${notification.lenderUsername} did not accept or reject your request before the pick up time you selected.`
                    }}
                  </p>
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
import { dateFormat, getDurationInDays } from "../../utils/dateFormat";
export default {
  name: "BorrowRequestExpired",
  props: ["notification", "selectedNotification"],
  methods: {
    deleteNotification() {
      this.$store.dispatch("deleteNotification", this.notification._id);
    },
    selectNotification() {
      this.$emit("select-notification", this.notification._id);

      if (this.notification.status === "unseen") {
        this.$emit("notification-seen", this.notification._id);
      }
    }
  },
  computed: {
    days() {
      let result = "days";
      if (this.duration === 1) {
        result = "day";
      }

      return result;
    },
    duration() {
      return getDurationInDays(
        this.notification.pickUpTime,
        this.notification.dropOffTime
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
    }
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
.card-header-text {
  padding: 16px 16px 0 16px;
  display: flex;
  justify-content: space-between;
}
.card-unseen {
  border-left: 4px solid #1976d2;
}
.status-expired {
  color: red;
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