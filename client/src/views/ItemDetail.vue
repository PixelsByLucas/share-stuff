<template>
  <div>ITEM DETAIL</div>
</template>
<script>
export default {
  name: "ItemDetail",
  computed: {},
  created() {
    this.$store.dispatch("getItemDetail", this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
</style>