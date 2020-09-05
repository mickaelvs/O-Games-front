<template>
  <body class="container">
    <figure>
      <img class= "img-header-home"
        src="../assets/images/img-header-ogame-black-green-perso.png"
        alt="header-image-ogame"
      />
      <figcaption>
        <h1 class="title-figure">Tournois eSport, stream en bien +</h1>
      </figcaption>
    </figure>

    <MainLayout />
    
  </body>
</template>

<script>
import MainLayout from "@/components/MainLayout.vue";
//import FooterLayout from "@/components/FooterLayout.vue";
//import HeaderLayout from "@/components/HeaderLayout.vue";
export default {
  name: "Home",
  components: {
  
    MainLayout,
      //FooterLayout,
    //HeaderLayout
  },
};
</script>
<style>
</style>
