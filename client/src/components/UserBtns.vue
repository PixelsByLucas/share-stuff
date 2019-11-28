<template>
  <div>
    <v-btn icon class="nav__icon">
      <v-icon>mdi-message-text-outline</v-icon>
    </v-btn>
    <v-btn icon class="nav__icon nav__icon--middle" to="/notifications">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn icon class="nav__icon" v-on="on">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in filteredProfileItems"
          v-bind:key="index"
          :to="item.url"
        >
          <v-list-item-title v-if="modalItems.includes(item.title)">{{
            item.title
          }}</v-list-item-title>
          <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "UserBtns"
};
</script>
