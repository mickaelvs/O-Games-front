<template>
  <section>
    <div class="three-card">
      <div class="card">
        <div class="card-image">
          <img src="../assets/images/war-soldiers-warrior.jpg" alt="Orange" />
        </div>

        <div class="card-body">
          <div class="card-title">
            <RouterLink v-bind:to="{ name: 'classement' }">
              <h3 class="h3-home">Classement</h3>
            </RouterLink>
          </div>
          <img
            class="trophy"
            src="../assets/images/icons8-trophée-50.png"
            alt="photo"
          />
        </div>
      </div>

      <div class="card">
        <div class="card-image">
          <img src="../assets/images/warzone-ghost-green.jpg" alt="Orange" />
        </div>

        <div class="card-body">
          <div class="card-title">
            <RouterLink v-bind:to="{ name: 'stream' }">
              <h3 class="h3-home">Stream</h3>
            </RouterLink>
          </div>
          <img
            class="icon-twitch"
            src="../assets/images/replay-on-twitch.png"
            alt="photo"
          />
        </div>
      </div>

      <div class="card">
        <div class="card-image">
          <img
            class="img-tournois"
            src="../assets/images/call-of-dury-image.jpg"
            alt="Orange"
          />
        </div>

        <div class="card-body">
          <div class="card-title">
            <RouterLink v-bind:to="{ name: 'news' }"><h3  class="h3-home">News</h3></RouterLink>
          </div>
          <img
            class="img-news"
            src="../assets/images/icons8-actualités-de-google-50.png"
            alt="photo"
          />
        </div>
      </div>
    </div>
    <div class="next-tournament">
      <TournamentList />
    </div>

    <h1>Dernier tournoi</h1>

    <div class="past-tournament">
      <div class="team-one">
        <img class="logo-team-one" src="../assets/images/logo team ogame.png" />
        <div class="winner-cup">
          
        </div>
      </div>

      <div class="vs">
        <h1>VS</h1>
      </div>

      <div class="team-two">
        <img
          class="logo-team-two"
          src="../assets/images/_logo team oclock.png"
        />
      </div>

      <div class="text-past-tournament">
        <h4>Le 30 Juillet, O'game cup Warzone</h4>
        <p class="p-past-tournament">O'Game : 118pts / Oclock : 117pts</p>
      </div>

      <div class="logo-stream-past-tournament">
        <img
          class="logo-team-two"
          src="../assets/images/replay-on-twitch.png"
        />
      </div>
    </div>
    <FooterLayout />
  </section>
</template>

<script>
import TournamentList from "@/components/TournamentList.vue";
import FooterLayout from "@/components/FooterLayout.vue";
export default {
  name: "MainLayout",
  components: {
    TournamentList,
    FooterLayout,
  },
};
</script>

<style>
</style>
