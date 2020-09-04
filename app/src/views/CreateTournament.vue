<template>
  <body class="container">
     
   
   
     <h1 class="connexion-title">Proposer un tournoi</h1>
    <CreateTournamentForm />
    <FooterLayout />
         
  </body>
</template>

<script>
import CreateTournamentForm from "@/components/forms/CreateTournamentForm.vue";
import FooterLayout from "@/components/FooterLayout.vue";

export default {
  name: "CreateTournament",
  components: {
    CreateTournamentForm,
    FooterLayout
  }
};
</script>

<style lang="scss">


</style>