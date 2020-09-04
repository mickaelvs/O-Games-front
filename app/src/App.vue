<template>
  <div id="app">
    <HeaderLayout />
    <RouterView />
  <!--<FooterLayout />-->
  </div>
</template>

<script>
import HeaderLayout from "./components/HeaderLayout.vue";
//import FooterLayout from "./components/FooterLayout.vue";

export default {
  name: "App",
  components: {
    HeaderLayout,
    //FooterLayout
  },
  created() {
    this.$store.dispatch("reconnect");
  }
};
</script>
<style lang="scss">
@import "scss/header.scss";
@import "scss/footer.scss";




/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
