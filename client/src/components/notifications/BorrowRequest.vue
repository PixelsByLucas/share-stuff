<template>
  <div class="borrowRequest">
    <v-container fluid>
      <h1>Borrow Request!</h1>
    </v-container>
  </div>
</template>
<script>
// TODO: change borrowRequest.js model on the BE to include required data.

// This is the data currently being received:
// __v:0
// _id:"5ec491d6a8e0c34980f5741a"
// borrowerUsername:"user2"
// dropOffDate:"2020-05-22"
// dropOffTime:"03:15"
// itemId:"5ec490b0a8e0c34980f57414"
// message:"blah blah shit fuck"
// pickUpDate:"2020-05-20"
// pickUpTime:"03:15"
// status:"unseen"
// transactionId:"5ec491d6a8e0c34980f57419"

// Will need: item title, etc.?

export default {
  name: "BorrowRequest",
  props: ["notification"]
};
</script>
<style lang="scss" scoped>
</style>