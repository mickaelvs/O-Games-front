<template>
  <div v-if="newsData">
    <h1>{{ newsData.title.rendered }}</h1>
    <article class="news">
      <section class="informations">
        <ul>
          <li>Infos : {{ newsData.meta.news_game }} .</li>
          <li>
            Date
            {{ newsData.meta.date }} :
          </li>
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
        <h2>Détail</h2>
        <ul>
          <li v-for="detail in detailsData" v-bind:key="detail.id">
            {{ detail.name }}
          </li>
        </ul>
      </section>
      <section class="preparation">
        <h2>Type de News</h2>
        <main v-html="newsData.content.rendered"></main>
      </section>
    </article>
    <CommentList
      v-if="commentOpen"
      v-bind:postId="newsData.id"
      v-bind:commentCount="newsData.comment_count"
    />
  </div>
</template>

<script>
import ApiClient from "@/services/ApiClient.js";
//import CommentList from "@/components/CommentList.vue";

export default {
  name: "NewsFull",
  components: {
    //CommentList
  },
  props: {
    newsId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      newsData: null,
      imageData: null,
      detailsData: []
    };
  },
  methods: {
    getNewsData() {
      // @todo Récupérer les informations en meta
      let newsRequest = ApiClient.get(
        "/wp/v2/newses/" + this.newsId
      );

      newsRequest.then(response => {
        this.newsData = response.data;

        if (this.newsData.featured_media !== 0) {
          this.getImageData();
        }

        if (this.newsData["news-details"].length > 0) {
          this.getDetailsData();
        }
      });
      newsRequest.catch(error => {
        console.error(error);
      });
    },
    getImageData() {
      let imageRequest = ApiClient.get(
        "/wp/v2/media/" + this.newsData.featured_media
      );

      imageRequest.then(response => {
        this.imageData = response.data;
      });
    },
    getDetailsData() {
      let detailsRequest = ApiClient.get("/wp/v2/news-details", {
        params: {
          /**
           * Je récupère la liste des éléments uniquement liés à mon tournoi
           */
          include: this.newsData["news-details"]
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
      return this.newsData.comment_status === "open";
    }
  },
  mounted() {
    this.getNewsData();
  }
};
</script>