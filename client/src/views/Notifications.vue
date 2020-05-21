<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col
          v-for="{notification, notificationType} in notifications"
          cols="12"
          :key="notification._id"
        >
          <component :is="notificationComponent(notificationType)" :notification="notification" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BorrowRequest from "../components/notifications/BorrowRequest";
export default {
  name: "Notifications",
  components: {
    BorrowRequest
  },
  computed: mapState({
    notifications: state => state.users.me.notifications
  }),
  methods: {
    notificationComponent(notificationType) {
      switch (notificationType) {
        case "BorrowRequest":
          return BorrowRequest;
      }
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
</style>
