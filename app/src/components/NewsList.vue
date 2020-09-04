<template>
<div>
    <div class="news-list">
    
      
      <!-- Utilisation "dynamique" des props -->
       <h1>Actualités</h1><br>
     
      <NewsExcerpt
        v-for="news in newsItems"
        v-bind:key="news.id"
        v-bind:newsId="news.id"
        v-bind:title="news.title.rendered"
        v-bind:excerpt="news.excerpt.rendered"
        v-bind:imageId="news.featured_media"
      />
      <!-- Utilisation statique des props -->
      <!--
      <NewsExcerpt
        title="Tarte aux fraises"
        excerpt="Une excellente recette de tarte aux fraises"
        image="https://source.unsplash.com/collection/157&random=1" />
      <NewsExcerpt
        title="Tarte aux abricots"
        excerpt="Une excellente recette de tarte aux abricots"
        image="https://source.unsplash.com/collection/157&random=2" />
      <NewsExcerpt
        title="Tarte à la rhubarbe"
        excerpt="Une excellente recette de tarte à la rhubarbe"
        image="https://source.unsplash.com/collection/157&random=3" />
      -->
    </div>

    <div class="sponsor">
      <h2 class="liste-sponsors">Nos partenaires</h2>
      <a  href="https://www.spiritgamer.fr/"><img class="spirit" src="../assets/images/logo_header.png" alt="Spiritgamer-logo"/></a>
      <a  href="https://www.oclock.io/"><img class="oclock" src="../assets/images/w24mivl4s9gd6wvxlclnkrog2ww0d1nj.png" alt="Spiritgamer-logo"/></a>


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
import NewsExcerpt from "./NewsExcerpt.vue";
import PaginationNavigation from "./PaginationNavigation.vue";

export default {
  name: "NewsList",
  data() {
    return {
      typeItems: [],
      detailItems: [],
      newsItems: [],
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
    handleNewsListResponse(response) {
      this.newsItems = response.data;
    },
    handleNewsListResponseError(error) {
      console.error(error);
    },
    getTypeItems() {
      /**
       * @type {Promise}
       */
      let typeListRequest = ApiClient.get("/wp/v2/news-types");

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
      let detailListRequest = ApiClient.get("/wp/v2/news-details");
      detailListRequest.then(this.handleDetailListResponse);
      detailListRequest.catch(this.handleDetailListResponseError);
    },
    getNewsItems() {
      let newsListRequestParams = {
        page: this.pageNumber
      };

      if (this.selectedType) {
        newsListRequestParams["news-types"] = this.selectedType;
      }

      if (this.selectedDetails.length) {
        newsListRequestParams[
          "news-details"
        ] = this.selectedDetails;
      }

      let newsListRequest = ApiClient.get("/wp/v2/newses", {
        params: newsListRequestParams
      });
      newsListRequest.then(this.setTotalPages);
      newsListRequest.then(this.handleNewsListResponse);
      newsListRequest.catch(this.handleNewsListResponseError);

      /*
      // Sans variable stockant la promesse
      ApiClient
        .get(
          "/wp/v2/newses",
          {
            params: {
              page: this.pageNumber,
           },
          }
        )
        .then(this.setTotalPages)
        .then(this.handleNewsListResponse)
        .catch(this.handleNewsListResponseError);
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
      this.getNewsItems();
    }
  },
  /**
   * Hook déclenché juste après que le DOM ait été modifié par le composant ( ~= DOMContentLoaded à l'échelle du Composant)
   */
  mounted() {
    this.getTypeItems();

    this.getDetailItems();

    this.getNewsItems();
  },
  components: {
    NewsExcerpt,
    PaginationNavigation
  }
};
</script>

<style lang="scss">
@import "../scss/newspage.scss";

</style>