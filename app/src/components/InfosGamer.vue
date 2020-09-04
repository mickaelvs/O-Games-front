<template>
 
    <div class="container-profil">
      <header class="header-profil">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </header>
      <main>
        <div class="row">
          <div class="left">
             <div class="photo-left">
              <img class="photo" src="../assets/images/_logo team oclock.png" />
              <div class="active"></div>
            </div> 
            <h4 class="name">{{username}}</h4>
            <!-- <p class="select">selectionne une plateforme</p>
           <select  v-model="selected" aria-placeholder="selectionne une plateforme">selectionne une plateforme>      
              <option>XBOX</option>
              <option>PS4</option>
              <option>PC</option>
            </select>
            	<p class="info">Jeu favori: Call of duty</p>
            <p class="info">joelegamer@gmail.com</p>-->
<!-- start stats-->
<img class="mon-quartier-general" src="../assets/images/mon-quartier-general-jaune.png" />
<div class="wrapper">
<div class="card-card-stats">
	<div class="img-card-stats">
	</div>
	
	
	<div class="header-card-stat">
	<div class="profile-card-stats">
		
	
		
	</div>
	<div class="profile-pic">
	</div>
	<div class="logo-card-stats">
	</div>
	</div>
	
	
	<div class="footer-card-stats">
	<div class="stat-bar1">
		<h3>Top 5</h3>
		<p>95</p>
	</div>
	<div class="stat-bar2">
		<h3>Top 10</h3>
		<p>178</p>
	</div>
	<div class="stat-bar3">
		<h3>Top 25</h3>
		<p>388</p>
	</div>
	<div class="stat-bar4">
		<h3>Score par minutes</h3>
		<p>116</p>
	</div>
	<div class="stat-bar5">
		<h3>Score par game</h3>
		<p>2239</p>
	</div>
	<div class="stat-bar6">
		<h3>Points Ogame</h3>
		<p>2400</p>
	</div>
	</div>
</div>
</div>


<!-- end stats-->
            <div class="stats_row">
              <div class="stat">
                <img class="profil-icon-skill" src="../assets/images/icon-kills-perso.png" /><br>
                <p class="number-stat">{{kills}}</p>
                
              </div>
              <div class="stat">
                <img class="profil-icon-death" src="../assets/images/icon-death.png" />
                <p class="number-stat">{{deaths}}</p>
                
              </div>

              <div class="stat">
                <img class="profil-icon-ratio" src="../assets/images/icon-ratio-perso.png" />
                <p class="number-stat">{{kdRatio}}</p>
                
              </div>

              <div class="stat">
                <img class="profil-icon-win" src="../assets/images/icon-wins-perso.png" />
                <p class="number-stat">{{wins}}</p>
                
              </div>
            </div>
            <!-- <label class="progress" for="file">File progress:</label>
            <progress id="file" max="100" value="70">70%</progress> -->
            <p class="desc">
              Hello, mon pseudo est JoeLeGamer. Je suis un joueur régulier de
              call of duty, surtout sur le battle royale warzone
            </p>
          </div>
        </div>
       
        <div class="count-prochain-tournoi">
          <h2 class="h2-count-prochain-tournoi">Prochain Tournoi : </h2>
          <img class="countdown" src="https://img1.niftyimages.com/gj1/onio/6ebo?addHours=24" />
        </div>
        <div class="tournament-list">
          

          <ProfileExcerpt
            v-for="profile in profileItems"
            v-bind:key="profile.id"
            v-bind:profileId="profile.id"
            v-bind:title="profile.title.rendered"
            v-bind:excerpt="profile.excerpt.rendered"
            v-bind:imageId="profile.featured_media"
          />
        </div> 
        <nav class="site-nav-prop-tournois">
        <ul class="choice">
          <li>
            <RouterLink  v-bind:to="{ name: 'create-tournament' }">Proposer un Tournoi</RouterLink>
          </li>
          <li>
            <RouterLink  v-bind:to="{ name: 'invite-friend' }">Inviter un ami</RouterLink>
          </li>
          <li>
            <RouterLink  v-bind:to="{ name: 'rules-tournament' }">S'inscrire à un tournoi</RouterLink>
          </li>  
        </ul>
    </nav>   
        
      </main>
    </div> 
</template>

<script>
import axios from "axios";
import ApiClient from "@/services/ApiClient.js";
import ProfileExcerpt from "./ProfileExcerpt.vue";
//import FooterLayout from "@/components/FooterLayout.vue";




export default {
  name: "InfosGamer",
  components: {
    ProfileExcerpt,
  },

  data() {
    return {
      username: [],
      totalGamesPlayed: [],
      tournamentItems: [],
      kills: [],
      deaths: [],
      wins: [],
      kdRatio: [],
      typeItems: [],
      detailItems: [],
      profileItems: [],
      selectedType: null,
      selectedDetails: [],
      
    };
  },
  created() {
    let useri18 = sessionStorage.getItem("displayName");
    axios
      .get("https://testapi.io/api/ogame/stats")
      .then(response => (this.kills = response.data.stats[useri18].kills));
    axios
      .get("https://testapi.io/api/ogame/stats")
      .then(response => (this.deaths = response.data.stats[useri18].deaths));
    axios
      .get("https://testapi.io/api/ogame/stats")
      .then(response => (this.kdRatio = response.data.stats[useri18].kdRatio));
    axios
      .get("https://testapi.io/api/ogame/stats")
      .then(response => (this.wins = response.data.stats[useri18].wins));
    axios
      .get("https://testapi.io/api/ogame/stats")
      .then(
        response => (this.username = response.data.stats[useri18].username)
      );
    console.log(useri18);
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
      this.detaillItems = response.data;
    },
    handleDetailListResponseError(error) {
      console.error(error);
    },
    handleProfileListResponse(response) {
      this.profileItems = response.data;
    },
    handleTournamentListResponseError(error) {
      console.error(error);
    },
    getTypeItems() {
      /**
       * @type {Promise}
       */
      let typeListRequest = ApiClient.get("/wp/v2/profile-types");

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
      let detailListRequest = ApiClient.get("/wp/v2/profile-details");
      detailListRequest.then(this.handleDetailListResponse);
      detailListRequest.catch(this.handleDetailListResponseError);
    },
    getProfileItems() {
      let profileListRequestParams = {
        page: this.pageNumber
      };

      if (this.selectedType) {
        profileListRequestParams["profile-types"] = this.selectedType;
      }

      if (this.selectedDetails.length) {
        profileListRequestParams["profile-details"] = this.selectedDetails;
      }

      let profileListRequest = ApiClient.get("/wp/v2/profiles", {
        params: profileListRequestParams
      });
      profileListRequest.then(this.setTotalPages);
      profileListRequest.then(this.handleProfileListResponse);
      profileListRequest.catch(this.handleProfileListResponseError);

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
      this.getProfileItems();
    }
  },
  /**
   * Hook déclenché juste après que le DOM ait été modifié par le composant ( ~= DOMContentLoaded à l'échelle du Composant)
   */
  mounted() {
    this.getTypeItems();

    this.getDetailItems();

    this.getProfileItems();
  },

 

  

};
</script>

<style lang="scss">
@import "../scss/userprofile.scss";
//@import "../scss/donuts.scss";
@import "../scss/font.scss";
//@import "../scss/mainlayout.scss";
</style>