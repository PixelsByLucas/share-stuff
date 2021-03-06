<template>
  <div>
    <v-container fluid v-if="!fetchingItems">
      <v-row>
        <v-col cols="6">
          <Carousel :media="itemDetail.media" :itemId="itemDetail._id" />
        </v-col>
        <v-col cols="6">
          <h2 class="item-title">{{ itemDetail.name }}</h2>
          <p class="item-text">{{ itemDetail.description }}</p>
          <v-divider class="divider"></v-divider>
          <v-row align="center" no-gutters>
            <span class="item-text item-text__price">Price:</span>
            <v-icon
              class="karma-icon"
              color="black"
              v-text="'$vuetify.icons.karmaDark'"
            ></v-icon>
            <span>{{ itemDetail.price }}</span>
            <v-spacer></v-spacer>
            <!-- == borrow modal == -->
            <div v-if="myUsername !== itemOwnerUsername">
              <v-dialog
                v-if="!isLoggedIn"
                :scrollable="true"
                content-class="borrow-modal"
                max-width="675px"
                persistent
                v-model="borrowDialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on">BORROW</v-btn>
                </template>
                <LoginRegisterModal
                  v-if="!isLoggedIn"
                  style="height: 100%"
                  v-on:close-dialog="borrowDialog = false"
                />
              </v-dialog>
              <v-btn v-else @click="toBorrowPage()">BORROW</v-btn>
            </div>
            <!-- NOTE: render edit button if item belongs to user -->
            <v-btn v-else>EDIT</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-divider class="divider"></v-divider>
      </v-row>
      <v-row>
        <v-col cols="6">
          <!-- == avatar == -->
          <v-row no-gutters>
            <AvatarRating
              :_id="itemDetail.ownerId"
              :rating="itemDetail.owner.rating"
              :username="itemDetail.owner.username"
              size="small"
              variant="wide"
            />
          </v-row>
        </v-col>
        <v-col cols="6">
          <!-- == map == -->
          <div class="map-box">
            <LeafletMap
              :coords="itemDetail.owner.primaryLocation"
              :zoomProp="13"
              marker="location"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-progress-circular class="loading" indeterminate></v-progress-circular>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

import AvatarRating from "../components/AvatarRating";
import Carousel from "../components/Carousel";
import LeafletMap from "../components/LeafletMap";
import LoginRegisterModal from "../components/LoginRegisterModal";
import { profileDummyData } from "../utils/dummyData";
import router from "../router";

export default {
  name: "ItemDetail",
  components: {
    AvatarRating,
    Carousel,
    LeafletMap,
    LoginRegisterModal
  },
  data() {
    return {
      ...profileDummyData,
      borrowDialog: false
    };
  },
  computed: {
    ...mapState({
      itemDetail: state => state.items.itemDetail,
      fetchingItems: state => state.items.fetchingItems,
      myUsername: state => state.users.me.username,
      myKarma: state => state.users.me.karma,
      itemOwnerUsername: state => state.items.itemDetail.owner.username,
      isLoggedIn: state => state.users.me.isLoggedIn
    })
  },
  methods: {
    toBorrowPage() {
      if (this.myKarma < this.itemDetail.price) {
        alert("You don't have enough karma for this item");
      } else if (!this.itemDetail.available) {
        alert("This item is currently unavailable");
      } else {
        router.push("/item-borrow");
      }
    }
  },
  created() {
    this.$store.dispatch("getItemDetail", this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.item-title {
  font-family: "Knewave", cursive;
  font-size: 3rem;
}
.item-text {
  font-family: "Roboto";
  &__price {
    font-size: 1.4rem;
    margin-right: 16px;
  }
}
.divider {
  margin-bottom: 1rem;
}
.loading {
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.map-box {
  height: 300px;
}
</style>