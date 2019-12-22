<template>
  <div class="avatarRating">
    <v-avatar class="avatarRating__avatar">
      <img v-if="_id" :src="`${SERVER_URL}/users/${_id}/avatar`" class="avatarRating__img" />
      <v-icon v-else>mdi-account-outline</v-icon>
    </v-avatar>
    <Rating v-bind:rating="rating" />
  </div>
</template>
<script>
import Rating from "../components/Rating";
import { SERVER_URL } from "../apis/users";
export default {
  name: "AvatarRating",
  components: {
    Rating
  },
  props: ["_id", "rating"],
  data() {
    return {
      SERVER_URL
    };
  }
};
</script>
<style lang="scss">
.avatarRating {
  &__avatar {
    width: 100% !important;
    height: auto !important;
  }
  &__img {
    border: 4px solid #424242;
    padding: 1px;
  }
}
</style>
