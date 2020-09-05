<template>
  <body class="container">
    <main class="main-container">
      <div id="streaming-one">
        <img
          class="headerImg"
          src="../assets/images/ogame-cup-commingson-player.jpg"
        />
      </div>

      <div class="page-streaming">
        <h1>eSport Seattle Home Series :</h1>

        <div id="streaming-two">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Pwgjqu8b_j0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="text-page-streaming">
          <h1>Championnat du monde CALL OF DUTY :</h1>
        </div>

        <div id="streaming-three">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/d16jI2zAGMw"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </main>
    <FooterLayout />
  </body>
</template>

<script>
import FooterLayout from "@/components/FooterLayout.vue";
export default {
  name: "Stream",
  components: {
    FooterLayout,
  },
};
</script>

<style>
</style>
