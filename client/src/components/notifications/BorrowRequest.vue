<template>
  <div class="borrowRequest">
    <v-container fluid>
      <v-card :class="notification.status === `unseen` ? `card-unseen` : null">
        <div class="card-header-text">
          <div>
            <v-card-title class="title">
              <span>{{`Borrow Request - `}}</span>
              <span :class="statusClass">{{transactionStatus}}</span>
            </v-card-title>
            <p class="no-margin">{{notificationDate}}</p>
          </div>
          <div>
            <span>{{` from: `}}</span>
            <router-link
              class="subtitle"
              :to="`/profile/${notification.lenderUsername}`"
              tag="a"
            >{{notification.lenderUsername}}</router-link>

            <p class="no-margin">
              <span>{{`Requesting to borrow `}}</span>
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
                  <v-text-field
                    disabled
                    :value="pickUpTime"
                    outlined
                    label="Pick Up"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    disabled
                    v-model="dropOffTime"
                    outlined
                    label="Drop Off"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider v-if="ableToDelete"></v-divider>
            <v-card-actions class="actions">
              <v-btn v-if="ableToDelete" icon large tile @click="deleteNotification()">
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
import { SERVER_URL } from "../../apis/users";
import { dateFormat, getDurationInDays } from "../../utils/dateFormat";
export default {
  name: "BorrowRequest",
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
    ableToDelete() {
      let result = false;

      switch (this.notification.transaction.status) {
        case "declined":
          result = true;
          break;
        case "completed":
          result = true;
          break;
      }

      return result;
    },
    url() {
      const itemId = this.notification.itemId;
      const imageId = this.notification.itemImageId;
      return `${SERVER_URL}/items/${itemId}/media/${imageId}`;
    },
    notificationDate() {
      return dateFormat(this.notification.createdAt);
    },
    pickUpTime() {
      return dateFormat(this.notification.pickUpTime);
    },
    dropOffTime() {
      return dateFormat(this.notification.dropOffTime);
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
    days() {
      let result = "days";
      if (this.duration === 1) {
        result = "day";
      }

      return result;
    },
    statusClass() {
      let result = "";
      switch (this.notification.transaction.status) {
        case "declined":
          result = "status-declined";
          break;
        case "active":
          result = "status-active";
          break;
        case "completed":
          result = "status-completed";
          break;
        default:
          result = "status-pending";
      }

      return result;
    },
    transactionStatus() {
      const status = this.notification.transaction.status;
      return status[0].toUpperCase() + status.slice(1);
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
.card-unseen {
  border-left: 4px solid #1976d2;
}
.card-header-text {
  padding: 16px 16px 0 16px;
  display: flex;
  justify-content: space-between;
}
.decline-button {
  margin-left: 16px !important;
}
.image {
  width: 100%;
}
.image-container {
  max-width: 150px;
  max-height: 150px;
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
.status-active {
  color: green;
}
.status-completed {
  color: #1976d2;
}
.status-declined {
  color: red;
}
.status-pending {
}

.title {
  padding: 0;
  display: inline;
}
</style>