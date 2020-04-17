<template>
  <div class="user-blurb">
    <h1>{{ user.username }}</h1>
    <h2>
      <span>{{ name }}</span>
      <span class="user-blurb__age">{{ "age: " + user.age }}</span>
    </h2>
    <p>{{ user.bio }}</p>
  </div>
</template>
<script>
export default {
  name: "UserBio",
  props: ["user"],
  computed: {
    name() {
      const first =
        this.user.firstName.charAt(0).toUpperCase() +
        this.user.firstName.slice(1);
      // const lastInitial = this.user.lastName.charAt(0).toUpperCase() + ".";
      return `${first} ${this.user.lastNameInitial}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.user-blurb {
  &__age {
    margin-left: 1rem;
  }
}
</style>
