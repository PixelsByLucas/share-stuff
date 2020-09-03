<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col
          v-for="{notification, notificationType} in notifications"
          cols="12"
          :key="notification._id"
        >
          <component
            :is="notificationComponent(notificationType)"
            :notification="notification"
            :selectedNotification="selectedNotification"
            v-on:select-notification="setSelectedNotification"
            v-on:notification-seen="setNotificationSeen"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import LendingRequest from "../components/notifications/LendingRequest";
import BorrowRequest from "../components/notifications/BorrowRequest";
import PickUpReminder from "../components/notifications/PickUpReminder";
import DropOffReminder from "../components/notifications/DropOffReminder";
import ItemReturnFlow from "../components/notifications/ItemReturnFlow";

export default {
  name: "Notifications",
  components: {
    LendingRequest,
    BorrowRequest,
    DropOffReminder,
    PickUpReminder,
    ItemReturnFlow
  },
  data() {
    return {
      selectedNotification: null
    };
  },
  computed: mapState({
    notifications: state =>
      state.users.me.notifications
        .slice()
        .sort(
          ({ notification: notificationA }, { notification: notificationB }) =>
            new Date(notificationB.createdAt) -
            new Date(notificationA.createdAt)
        )
  }),
  methods: {
    notificationComponent(notificationType) {
      switch (notificationType) {
        case "LendingRequest":
          return LendingRequest;
        case "BorrowRequest":
          return BorrowRequest;
        case "PickUpReminder":
          return PickUpReminder;
        case "DropOffReminder":
          return DropOffReminder;
        case "ItemReturnFlow":
          return ItemReturnFlow;
      }
    },
    setSelectedNotification(id) {
      if (this.selectedNotification === id) {
        this.selectedNotification = null;
      } else {
        this.selectedNotification = id;
      }
    },
    setNotificationSeen(id) {
      this.$store.dispatch("setNotificationSeen", id);
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
</style>
