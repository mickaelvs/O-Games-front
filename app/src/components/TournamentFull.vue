<template>
  <div v-if="tournamentData">
    <h1>{{ tournamentData.title.rendered }}</h1>
    <article class="tournament">
      <section class="informations">
        <ul>
          <li>
            Titre : {{ tournamentData.meta.title }}
          </li>
          <li>Date de début : {{ tournamentData.meta.dateStart }} </li>
          <li>Heure de début : {{ tournamentData.meta.timeStart }} </li>
          <li>Nombre de Participants : {{ tournamentData.meta.maxParticipants }} </li>
          <li>gameMode : {{ tournamentData.meta.gameMode }} </li>
        </ul>
        <div
          class="media-image"
          v-if="imageData"
          v-bind:style="{
            backgroundImage: cssBackgroundImage
          }"
        ></div>
      </section>

      <section class="details">
        <h2>Plateformes de Jeu</h2>
        <ul>
          <li v-for="detail in detailsData" v-bind:key="detail.id">
            {{ detail.name }}
          </li>
        </ul>
      </section>
      <section class="content">
        <h2>Description</h2>
        <main v-html="tournamentData.content.rendered"></main>
      </section>
    </article>
    <CommentList
      v-if="commentOpen"
      v-bind:postId="tournamentData.id"
      v-bind:commentCount="tournamentData.comment_count"
    />
  </div>
</template>

<script>
import ApiClient from "@/services/ApiClient.js";
import CommentList from "@/components/CommentList.vue";

export default {
  name: "TournamentFull",
  components: {
    CommentList
  },
  props: {
    tournamentId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tournamentData: null,
      imageData: null,
      detailsData: []
    };
  },
  methods: {
    getTournamentData() {
      // @todo Récupérer les informations en meta
      let tournamentRequest = ApiClient.get("/wp/v2/tournaments/" + this.tournamentId);

      tournamentRequest.then(response => {
        this.tournamentData = response.data;

        if (this.tournamentData.featured_media !== 0) {
          this.getImageData();
        }

        if (this.tournamentData["tournament-details"].length > 0) {
          this.getDetailsData();
        }
      });
      tournamentRequest.catch(error => {
        console.error(error);
      });
    },
    getImageData() {
      let imageRequest = ApiClient.get(
        "/wp/v2/media/" + this.tournamentData.featured_media
      );

      imageRequest.then(response => {
        this.imageData = response.data;
      });
    },
    getDetailsData() {
      let detailsRequest = ApiClient.get("/wp/v2/tournament-details", {
        params: {
          /**
           * Je récupère la liste des détails uniquement liés à mon tournoi
           */
          include: this.tournamentData["tournament-details"]
        }
      });

      detailsRequest.then(response => {
        this.detailsData = response.data;
      });
    }
  },
  computed: {
    cssBackgroundImage() {
      let cssBackgroundImage;

      if (this.imageData) {
        cssBackgroundImage =
          "url(" + this.imageData.media_details.sizes.full.source_url + ")";
      } else {
        cssBackgroundImage = null;
      }

      return cssBackgroundImage;
    },
    commentOpen() {
      return this.tournamentData.comment_status === "open";
    }
  },
  mounted() {
    this.getTournamentData();
  }
};
</script>

<style lang="scss">
ul {
  list-style-type: disc;
  padding-left: 1.2rem;
  padding-bottom: 1rem;
}

.preparation {
  p {
    margin-bottom: 1rem;
  }
}

.media-image {
  background: {
    size: cover;
  }
  height: 50vh;
  width: 100%;
}
</style>
