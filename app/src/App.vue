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
<style>
</style>
