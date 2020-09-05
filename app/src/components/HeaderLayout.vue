<template>
  <body>
    <header class="ogame-header">
      <div class="logo">
        <a href="#" class="logo">Ogame</a>
      </div>
      <nav class="site-nav">
        <ul>
          <li>
            <RouterLink v-bind:to="{ name: 'home' }">Home</RouterLink>
          </li>
          <li>
            <RouterLink v-bind:to="{ name: 'tournament-home' }">Tournois</RouterLink>
          </li>
          <li>
            <RouterLink v-bind:to="{ name: 'stream' }">Stream</RouterLink>
          </li>
          <li>
            <RouterLink v-bind:to="{ name: 'news-home' }">News</RouterLink>
          </li>
          <li>
            <RouterLink v-bind:to="{ name: 'classement' }">Classement</RouterLink>
          </li>
        </ul>
      </nav>
      <span class="user-login">
        <div class="login-button">
          <RouterLink v-bind:to="{ name: 'login' }" v-if="userLoggedOut"
            >Connexion</RouterLink
          >
        </div>
        <div class="register-button">
          <RouterLink v-bind:to="{ name: 'register' }" v-if="userLoggedOut"
            >Inscription</RouterLink
          >

          <div class="user" v-if="userLoggedIn">
            <RouterLink v-bind:to="{ name: 'userProfil' }" class="username"><!--{{
              userDisplayName
            }}--> <img
        class="avatar"
        src="../assets/images/mon qg-green.png"
        v-on:click="toggleUserMenu()"
      /> </RouterLink>
 
           
            <div class="user-actions" v-show="userMenuVisible" >
              <a v-on:click="disconnect()"><RouterLink v-bind:to="{ name: 'home' }"> Déconnexion </RouterLink> </a>

            </div>
          </div>
        </div>
      </span>
    </header>
  </body>
</template>
<script>
export default {
  name: "HeaderLayout",
  // La propriété data doit être de type function et doit retourner un objet
  // data: function() {
  data() {
    return {
      userMenuVisible: false
    };
  },
  methods: {
    toggleUserMenu() {
      this.userMenuVisible = !this.userMenuVisible;
    },
    disconnect() {
      // J'exécute l'action disconnect du store
      this.$store.dispatch("disconnect")

      
      this.userMenuVisible = false;
    }
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
