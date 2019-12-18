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
          <ItemCard v-for="item in items" :item="item" :key="item.name"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from "@/components/ItemCard.vue";
import ProfileBio from "@/components/ProfileBio.vue";
import { SERVER_URL } from "../apis/users";
import axios from 'axios';

export default {
  name: "profile",
  components: {
    ItemCard,
    ProfileBio,
  },
  methods:{
    async getItems(id){
      axios.get(`${SERVER_URL}/items/user/${id}`)
      .then( res => {
        this.items = res.data
        console.log(res.data);
      })
    }
  },
  data (){
    return{
      items: Array,
    }
  },
  mounted(){
    this.getItems('5df19c9f0c2eb317e866904d');
  }
};
</script>
