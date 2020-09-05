<template>
  <main class="main-container">
    <NewsFull v-bind:newsId="newsId" />
  </main>
</template>

<script>
import NewsFull from "../components/NewsFull.vue";

export default {
  name: "News",
  components: {
    NewsFull
  },
  computed: {
    newsId() {
      return parseInt(this.$route.params.newsId, 10);
    }
  }
};
</script>

<style>
</style>