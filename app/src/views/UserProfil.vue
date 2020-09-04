<template>
  <div>
    <body class="container">
     
        <HeaderLayout />
        <InfosGamer />
        <FooterLayout />
     
    </body>
  </div>
</template>

<script>
//import HeaderLayout from "@/components/HeaderLayout.vue";
import InfosGamer from "@/components/InfosGamer.vue";
import FooterLayout from "@/components/FooterLayout.vue";

export default {
  name: "UserProfil",
  components: {
    //HeaderLayout,
    InfosGamer,
    FooterLayout
  }
};
</script>

<style lang="scss">
@import "../scss/userprofile.scss";


#app {
  background-color: black;
}
</style>
