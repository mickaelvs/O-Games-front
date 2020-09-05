<template>
  <body class="container">
    <span class="title-classement">Classement Ogame </span>
    <table class="container-classement">
      <thead>
        <tr>
          <th><h1 class="h1tab">Joueurs</h1></th>
          <th><h1 class="h1tab">Kills</h1></th>
          <th><h1 class="h1tab">Wins</h1></th>
          <th><h1 class="h1tab">Pts</h1></th>
        </tr>
      </thead>
      <tbody class="tableau">
        <tr>
          <td>Maude</td>
          <td>97</td>
          <td>27</td>
          <td>2700pts</td>
        </tr>
        <tr>
          <td>RichardGim</td>
          <td>77</td>
          <td>26</td>
          <td>2600pts</td>
        </tr>
        <tr>
          <td>Mickael</td>
          <td>107</td>
          <td>24</td>
          <td>2400pts</td>
        </tr>
        <tr>
          <td>Joelegamer</td>
          <td>53</td>
          <td>20</td>
          <td>2000pts</td>
        </tr>
        <tr>
          <td>Ishot78</td>
          <td>43</td>
          <td>18</td>
          <td>1800pts</td>
        </tr>
        <tr>
          <td>HeadShot19</td>
          <td>36</td>
          <td>11</td>
          <td>1100pts</td>
        </tr>
        <tr class="user-classement" v-if="userLoggedIn">
          <td class="case-mon-classement">Mon classement</td>
          <td>{{kills}}</td>
          <td>{{wins}}</td>
          <td>{{pointsclassement}}pts</td>
        </tr>
      </tbody>
    </table>
    <FooterLayout />
  </body>
</template>

<script>
import axios from "axios";
import FooterLayout from "@/components/FooterLayout.vue";

export default {
  name: "ClassementPage",
  components: {
    FooterLayout,
  },

   data() {
    return {
      wins: [],
      kills: [],
      pointsclassement: []
    };
  },
  created() {
    
    let useri18 = sessionStorage.getItem("displayName");

    axios
      .get("https://testapi.io/api/ogame/stats")
      .then(response => (this.pointsclassement = response.data.stats[useri18].pointsclassement));

      axios
      .get("https://testapi.io/api/ogame/stats")
      .then(response => (this.kills = response.data.stats[useri18].kills));

      axios
      .get("https://testapi.io/api/ogame/stats")
      .then(response => (this.wins = response.data.stats[useri18].wins));
    
    console.log(useri18);
    
  },

  computed: {
    userLoggedIn() {
      // return this.$store.state.user !== null;
      return !!this.$store.state.user;
    },
    userLoggedOut() {
      return !this.userLoggedIn;
    },
    userDisplayName() {
      return this.$store.state.user.displayName;
    }
  }

  

 
};
</script>

<style>
</style>
