<template>
  <div class="profile">
    <div v-if="fetchingUser || !profileUser.username">
      <v-progress-circular class="loading" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-container fluid class="profile__header">
        <v-row>
          <v-col xs="12" sm="3">
            <AvatarRating v-bind:_id="profileUser._id" v-bind:rating="profileUser.rating" />
          </v-col>
          <v-col xs="12" sm="7">
            <UserBio v-bind:user="profileUser" />
          </v-col>
          <v-col xs="12" sm="2" align-self="end">
            <v-btn v-if="profileUser.isUserMe && !editing">EDIT PROFILE</v-btn>
            <v-btn v-else-if="profileUser.isUserMe && editing">SAVE</v-btn>
            <v-btn v-else>SEND MESSAGE</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="profile__divider" />
      <section class="profile__gallery">
        <StuffReviewList
          v-if="!fetchingItems"
          v-bind:items="profileItems"
          v-bind:reviews="reviews"
        />
        <v-progress-circular v-else class="loading" indeterminate></v-progress-circular>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import AvatarRating from "../components/AvatarRating";
import UserBio from "../components/UserBio";
import StuffReviewList from "../components/StuffReviewList";

export default {
  name: "Profile",
  components: {
    AvatarRating,
    UserBio,
    StuffReviewList
  },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    ...mapState({
      reviews: state => state.reviews.profileReviews,
      fetchingUser: state => state.users.fetchingUser,
      fetchingItems: state => state.items.fetchingItems,
      profileUser: state => state.users.profileUser,
      profileItems: state => state.items.profileItems,
      isLoggedIn: state => state.users.me.isLoggedIn
    })
  },
  methods: {
    getProfileData(paramUsername) {
      if (!this.fetchingUser && this.isLoggedIn) {
        this.$store
          .dispatch("getUserProfileData", paramUsername)
          .then(async () => {
            this.$store.dispatch("getProfileItems", this.profileUser._id);
            this.$store.dispatch("getProfileReviews", paramUsername);
          });
      }
    }
  },
  watch: {
    isLoggedIn: function() {
      this.getProfileData(this.$route.params);
    }
  },
  // NOTE: beforeRouteUpdate() didn't seem to be doing anything so turned it off.

  // beforeRouteUpdate(to, from, next) {
  //   // if (
  //   //   this.$store.state.users.profileUser.username !==
  //   //   this.$route.params.username
  //   // ) {
  //   console.log("HGITTAWWDA");
  //   this.getProfileData(to.params);
  //   // }

  //   next();
  // },
  created() {
    this.getProfileData(this.$route.params);
  }
};
</script>
<style lang="scss" scoped>
.profile {
  &__divider {
    margin: 0 1rem;
  }
  &__gallery {
    position: relative;
  }
}
.loading {
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
</style>
