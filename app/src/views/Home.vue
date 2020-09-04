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
<style lang="scss">
@import "../scss/header.scss";
@font-face {
  font-family: Earth Orbiter;
  src: url(../assets/fonts/earthorbiter.ttf);
}


figure {
  display: flex;
  flex-flow: column;
  //padding: 5px;
  max-width: 100%;
  width: 80%;
  margin: auto;
}

.img-header-home {
  max-width: 100%;
  max-height: 80%;
  overflow: hidden;
  margin-top: 5%;
}

figcaption {
  background: linear-gradient(black, #3c5a14);
  opacity: 0.5;
  height: 30%;
  color: #fff;
  font-family: nazalization;
  font-size: 33px;
  //padding: 3px;
  text-align: center;
}
</style>
