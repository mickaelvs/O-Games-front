<template>
  <div>
    
    <div class="tournament-list">
      <h1>Tournois</h1>
      <!-- Utilisation "dynamique" des props -->
      <TournamentExcerpt
        v-for="tournament in tournamentItems"
        v-bind:key="tournament.id"
        v-bind:tournamentId="tournament.id"
        v-bind:title="tournament.title.rendered"
        v-bind:excerpt="tournament.excerpt.rendered"
        v-bind:imageId="tournament.featured_media"
      />
      <!-- Utilisation statique des props -->
      <!--
      <TournamentExcerpt
        title="Tarte aux fraises"
        excerpt="Une excellente recette de tarte aux fraises"
        image="https://source.unsplash.com/collection/157&random=1" />
      <TournamentExcerpt
        title="Tarte aux abricots"
        excerpt="Une excellente recette de tarte aux abricots"
        image="https://source.unsplash.com/collection/157&random=2" />
      <TournamentExcerpt
        title="Tarte à la rhubarbe"
        excerpt="Une excellente recette de tarte à la rhubarbe"
        image="https://source.unsplash.com/collection/157&random=3" />
      -->
    </div>
    <PaginationNavigation
      routeName="home-paginated"
      v-bind:pageNumber="pageNumber"
      v-bind:totalPages="totalPages"
    />
  </div>
  
</template>

<script>
import ApiClient from "@/services/ApiClient.js";
import TournamentExcerpt from "./TournamentExcerpt.vue";
import PaginationNavigation from "./PaginationNavigation.vue";

export default {
  name: "TournamentList",
  data() {
    return {
      typeItems: [],
      detailItems: [],
      tournamentItems: [],
      totalPages: 0,
      selectedType: null,
      selectedDetails: []
    };
  },
  methods: {
    handleTypeListResponse(response) {
      // console.log("OK", response.data);
      // Contrairement à fetch, axios nous envoie les données directement dans un objet
      // J'insère les données reçues en réponse à ma requête HTTP dans une data de mon composant afin de les utiliser dans le template
      this.typeItems = response.data;
    },
    handleTypeListResponseError(error) {
      console.error("KO", error);
    },
    handleDetailListResponse(response) {
      this.detailItems = response.data;
    },
    handleDetailListResponseError(error) {
      console.error(error);
    },
    handleTournamentListResponse(response) {
      this.tournamentItems = response.data;
    },
    handleTournamentListResponseError(error) {
      console.error(error);
    },
    getTypeItems() {
      /**
       * @type {Promise}
       */
      let typeListRequest = ApiClient.get("/wp/v2/tournament-types");

      /**
       * J'associe le traitement à effectuer en cas de succès (promesse résolue)
       *
       * La fonction fléchée me permet d'accéder au this de composant (qui correspond à l'instance de mon composant)
       */
      typeListRequest.then(this.handleTypeListResponse);

      /**
       * J'associe le traitement à effectuer en cas d'échec (promesse rejetée)
       */
      typeListRequest.catch(this.handleTypeListResponseError);
    },
    getDetailItems() {
      let detailListRequest = ApiClient.get("/wp/v2/tournament-details");
      detailListRequest.then(this.handleDetailListResponse);
      detailListRequest.catch(this.handleDetailListResponseError);
    },
    getTournamentItems() {
      let tournamentListRequestParams = {
        page: this.pageNumber
      };

      if (this.selectedType) {
        tournamentListRequestParams["tournament-types"] = this.selectedType;
      }

      if (this.selectedDetails.length) {
        tournamentListRequestParams[
          "tournament-details"
        ] = this.selectedDetails;
      }

      let tournamentListRequest = ApiClient.get("/wp/v2/tournaments", {
        params: tournamentListRequestParams
      });
      tournamentListRequest.then(this.setTotalPages);
      tournamentListRequest.then(this.handleTournamentListResponse);
      tournamentListRequest.catch(this.handleTournamentListResponseError);

      /*
      // Sans variable stockant la promesse
      ApiClient
        .get(
          "/wp/v2/tournaments",
          {
            params: {
              page: this.pageNumber,
           },
          }
        )
        .then(this.setTotalPages)
        .then(this.handleTournamentListResponse)
        .catch(this.handleTournamentListResponseError);
      */
    },
    setTotalPages(response) {
      this.totalPages = parseInt(response.headers["x-wp-totalpages"], 10);

      return response;
    }
  },
  computed: {
    pageNumber() {
      let pageNumber;

      if (this.$route.params.pageNumber) {
        pageNumber = parseInt(this.$route.params.pageNumber, 10);
      } else {
        pageNumber = 1;
      }

      return pageNumber;
    }
  },
  /**
   * @link https://raoulkramer.de/vue-js-router-pagination/
   */
  watch: {
    /**
     * On observe les modifications du pageNumber afin de recharger la liste des recettes en fonction de la page sélectionnée
     *
     * @link https://fr.vuejs.org/v2/guide/computed.html#Observateurs
     */
    pageNumber() {
      this.getTournamentItems();
    }
  },
  /**
   * Hook déclenché juste après que le DOM ait été modifié par le composant ( ~= DOMContentLoaded à l'échelle du Composant)
   */
  mounted() {
    this.getTypeItems();

    this.getDetailItems();

    this.getTournamentItems();
  },
  components: {
    TournamentExcerpt,
    PaginationNavigation
  }
};
</script>

<style>
</style>
