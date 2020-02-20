<template>
  <div class="container">
    <h1 id="title">404</h1>
    <h2 id="subtitle">Not found</h2>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>
<style lang="scss" scoped>
#title,
#subtitle {
  font-family: "Knewave", cursive;
}

#title {
  font-size: 16rem;
  text-align: center;
}

#subtitle {
  font-size: 4rem;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
