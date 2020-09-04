<template>
<body class="container">
  

  <main class="main-container">
    <TournamentList />
    <nav class="site-nav-prop-tournois">
        <ul>
          <li>
            <RouterLink  v-bind:to="{ name: 'create-tournament' }">Proposer un Tournoi</RouterLink>
          </li>
          <li>
            <RouterLink  v-bind:to="{ name: 'invite-friend' }">Inviter un ami</RouterLink>
          </li>
          <li>
            <RouterLink  v-bind:to="{ name: 'rules-tournament' }">S'inscrire à un tournoi</RouterLink>
          </li>  
        </ul>
    </nav>   
  </main>
<FooterLayout />
  </body>
</template>

<script>
import TournamentList from "../components/TournamentList.vue";
import FooterLayout from "@/components/FooterLayout.vue";
export default {
  name: "TournamentHome",
  components: {
    TournamentList,
    FooterLayout
  }
};
</script>
