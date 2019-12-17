<template>
  <div class="about">
    <ProfileBio/>
    <hr>
    <v-container class="grey lighten-5">
      <v-btn rounded>Add Item</v-btn>
    </v-container>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col
          v-for="n in 4"
          :key="n"
          cols="12"
          md="3"
        >
          <ItemCard />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from "@/components/ItemCard.vue";
import ProfileBio from "@/components/ProfileBio.vue";

export default {
  name: "profile",
  components: {
    ItemCard,
    ProfileBio,
  }
};
</script>
