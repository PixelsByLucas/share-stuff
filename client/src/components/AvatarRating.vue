<template>
  <div class="avatarRating" :class="{
      'wide': variant === 'wide'
    }">
    <v-avatar
      class="avatarRating__avatar"
      :class="{'avatar-wide': variant === 'wide'}"
      :size="getAvatarSize"
    >
      <img v-if="_id" :src="`${SERVER_URL}/users/${_id}/avatar`" class="avatarRating__img" />
      <v-icon v-else>mdi-account-outline</v-icon>
    </v-avatar>
    <div class="rating-username-box">
      <router-link v-if="variant === 'wide'" :to="`/profile/${username}`" tag="a">{{username}}</router-link>
      <Rating v-bind:rating="rating" :size="size" />
    </div>
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
  props: ["_id", "rating", "size", "variant", "username"],
  data() {
    return {
      SERVER_URL
    };
  },
  computed: {
    getAvatarSize() {
      switch (this.size) {
        case "small":
          return "100";
        default:
          return "100%";
      }
    }
  }
};
</script>
<style lang="scss">
.map-small {
  // max-width: 100px;
  // max-height: 100px;
}
.wide {
  display: flex;
  align-items: center;
}
.avatar-wide {
  margin-right: 16px;
}
.avatarRating {
  &__avatar {
    // width: 100% !important;
    // height: auto !important;
  }
  &__img {
    border: 4px solid #424242;
    padding: 1px;
  }
}

.rating-username-box {
  // margin-left: 16px;
}
</style>
