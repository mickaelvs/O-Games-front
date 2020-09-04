<template>
  <div v-if="profileData">
    <h1>{{ profileData.title.rendered }}</h1>
    <article class="profile">
      <section class="informations">
        <ul>
          <li>Email {{ profileData.meta.email }} .</li>
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
        <h2>Détails</h2>
        <ul>
          <li v-for="detail in detailssData" v-bind:key="detail.id">
            {{ detail.name }}
          </li>
        </ul>
      </section>
      <section class="preparation">
        <h2>Préparation du Profil</h2>
        <main v-html="profileData.content.rendered"></main>
      </section>
    </article>
    <CommentList
      v-if="commentOpen"
      v-bind:postId="profileData.id"
      v-bind:commentCount="profileData.comment_count"
    />
  </div>
</template>

<script>
import ApiClient from "@/services/ApiClient.js";
//import CommentList from "@/components/CommentList.vue";

export default {
  name: "ProfileFull",
  components: {
    //CommentList
  },
  props: {
    profileId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      profileData: null,
      imageData: null,
      detailsData: []
    };
  },
  methods: {
    getProfileData() {
      // @todo Récupérer les informations en meta
      let profileRequest = ApiClient.get(
        "/wp/v2/profiles/" + this.profileId
      );

      profileRequest.then(response => {
        this.profileData = response.data;

        if (this.profileData.featured_media !== 0) {
          this.getImageData();
        }

        if (this.profileData["profile-details"].length > 0) {
          this.getDetailsData();
        }
      });
      profileRequest.catch(error => {
        console.error(error);
      });
    },
    getImageData() {
      let imageRequest = ApiClient.get(
        "/wp/v2/media/" + this.profileData.featured_media
      );

      imageRequest.then(response => {
        this.imageData = response.data;
      });
    },
    getDetailsData() {
      let detailsRequest = ApiClient.get("/wp/v2/profil-details", {
        params: {
          /**
           * Je récupère la liste des éléments uniquement liés à mon tournoi
           */
          include: this.profileData["profile-details"]
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
      return this.profileData.comment_status === "open";
    }
  },
  mounted() {
    this.getProfileData();
  }
};
</script>

<style lang="scss"></style>