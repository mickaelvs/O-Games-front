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

<style lang="scss">
body {
  background-color: #0c0322;
}

.page-streaming {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ogame-comming-soon {
  width: 52%;
  border: solid 1px white;
  margin-left: 21%;
}

#streaming-one{
  margin: auto;
  margin-left: 25%;
}

#streaming-two {
  margin-left: 25%;
}

#streaming-three {
  margin-left: 25%;
  margin-bottom: 10%;
}
</style>
