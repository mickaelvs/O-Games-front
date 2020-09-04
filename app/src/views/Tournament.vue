<template>
  <main class="main-container">
    <TournamentFull v-bind:tournamentId="tournamentId" />
  </main>
</template>

<script>
import TournamentFull from "../components/TournamentFull.vue";

export default {
  name: "Tournament",
  components: {
    TournamentFull
  },
  computed: {
    tournamentId() {
      return parseInt(this.$route.params.tournamentId, 10);
    }
  }
};
</script>

<style></style>
