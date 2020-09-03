<template>
  <div class="item-return-flow">
    <v-container fluid>
      <v-card :class="notification.status === `unseen` ? `card-unseen` : null">
        <div class="card-header-text">
          <div>
            <v-card-title class="title">Item Return</v-card-title>
            <p class="no-margin">{{notificationDate}}</p>
          </div>
          <div>
            <span>{{userIsBorrower ? "Lender: " : "Borrower: "}}</span>
            <router-link
              :to="`/profile/${userIsBorrower ? notification.lenderUsername : notification.borrowerUsername}`"
              tag="a"
            >{{userIsBorrower ? notification.lenderUsername : notification.borrowerUsername}}</router-link>
            <p>
              <span>{{userIsBorrower ? "Borrowing " : "Lending "}}</span>
              <strong>{{notification.itemName}}</strong>
              <span>{{` for ${duration} ${days}`}}</span>
            </p>
          </div>
        </div>
        <div class="select-button">
          <v-btn icon @click="selectNotification()">
            <v-icon>{{isNotificationSelected ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
          </v-btn>
        </div>

        <v-expand-transition>
          <div v-show="isNotificationSelected">
            <v-divider></v-divider>
            <v-card-text>
              <div v-if="!notification.itemReturned">
                <v-row>
                  <v-col cols="12">
                    <p>
                      {{`${notification.borrowerUsername} was due to return ${notification.itemName} today at ${dropOffTime}.`}}
                      <br />
                      <strong>Has the item been returned yet?</strong>
                    </p>
                  </v-col>
                </v-row>
              </div>
              <div v-if="notification.itemReturned && !isReviewComplete">
                <v-row>
                  <v-col cols="6">
                    <p class="no-margin">
                      <span
                        v-if="notification.itemReturned === 'yes'"
                      >Congratulations on a successful borrow!</span>
                      <span
                        v-if="notification.itemReturned === 'no' && !userIsBorrower"
                      >We're sorry to hear that your item hasn't been returned yet.</span>
                      <span
                        v-if="notification.itemReturned === 'no' && userIsBorrower && !isReviewComplete"
                      >Please return the item as soon as possible.</span>
                      <br />
                      {{`Please provide a rating for ${notification.borrowerUsername}'s performance`}}
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <v-textarea
                      outlined
                      :label="`Type a review`"
                      v-model="review.message"
                      :disabled="isReviewComplete"
                      :readonly="isReviewComplete"
                      :rules="messageRules"
                    ></v-textarea>
                    <div class="rating-thumb-box">
                      <v-icon
                        :size="30"
                        :class="`rating-thumb ${review.rating === 1 ? 'green' : null}`"
                        @click="setRating(1)"
                      >mdi-thumb-up-outline</v-icon>
                      <v-icon
                        :size="30"
                        :class="`rating-thumb ${review.rating === -1 ? 'red' : null}`"
                        @click="setRating(-1)"
                      >mdi-thumb-down-outline</v-icon>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div v-if="notification.itemReturned && isReviewComplete">
                <v-row>
                  <v-col cols="12">
                    <p class="no-margin">
                      <span>Your review has been submitted successfully.</span>
                    </p>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="card-actions">
              <div v-if="!notification.itemReturned">
                <!-- Render Yes, No buttons -->
                <v-btn @click="setItemReturned(true)">YES</v-btn>
                <v-btn @click="setItemReturned(false)" class="no-button">NO</v-btn>
              </div>
              <div v-if="notification.itemReturned && !isReviewComplete">
                <!-- Render Submit button -->
                <v-btn @click="submitReview">SUBMIT</v-btn>
              </div>
              <div v-if="notification.itemReturned && isReviewComplete">
                <!-- Render Delete button -->
                <v-btn icon large tile @click="deleteNotification()">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import {
  dateFormat,
  getDurationInDays,
  getTimeFromDate
} from "../../utils/dateFormat";
import { mapState } from "vuex";
export default {
  name: "ItemReturnFlow",
  props: ["notification", "selectedNotification"],
  data() {
    return {
      review: {
        message: "",
        rating: null
      },
      messageRules: [
        v => v.length < 200 || "Message must be less than 200 character"
      ]
    };
  },
  methods: {
    deleteNotification() {
      this.$store.dispatch("deleteNotification", this.notification._id);
    },
    selectNotification() {
      this.$emit("select-notification", this.notification._id);

      if (this.notification.status === "unseen") {
        this.$emit("notification-seen", this.notification._id);
      }
    },
    setItemReturned(itemReturned) {
      this.$store.dispatch("setReturnStatus", {
        id: this.notification._id,
        itemReturned
      });
    },
    setRating(value) {
      this.review.rating = value;
    },
    submitReview() {
      this.$store.dispatch("postReview", {
        transactionId: this.notification.transactionId,
        ...this.review
      });
    }
  },
  computed: {
    ...mapState({
      userId: state => state.users.me._id
    }),
    days() {
      let result = "days";
      if (this.duration === 1) {
        result = "day";
      }

      return result;
    },
    dropOffTime() {
      return getTimeFromDate(this.notification.transaction.dropOffTime);
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
    userIsBorrower() {
      return this.userId === this.notification.transaction.borrowerId;
    },
    isReviewComplete() {
      if (this.userIsBorrower) {
        return !!this.notification.transaction.reviews.borrower;
      } else {
        return !!this.notification.transaction.reviews.lender;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card-actions {
  display: flex;
  justify-content: flex-end;
}
.card-header-text {
  padding: 16px 16px 0 16px;
  display: flex;
  justify-content: space-between;
}
.card-unseen {
  border-left: 4px solid #1976d2;
}
.no-button {
  margin-left: 16px;
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
.rating-thumb {
  border: 2px solid #757575;
  padding: 3px;
  border-radius: 3px;
  cursor: pointer;
}
.rating-thumb-box {
  display: flex;
  justify-content: space-between;
}
.returned-actions {
  display: inline-block;
}
.return-actions-buttons {
  display: flex;
  justify-content: space-between;
}
</style>

