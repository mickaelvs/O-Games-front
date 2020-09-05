<template>
  <form v-on:submit.prevent="onSubmit">
    <div
      class="field"
      v-bind:class="{ 'field--error': errors.title.length }"
      v-on:keypress="errors.title = []"
    >
      <label class="field__label"></label>
      <input
        v-model="title"
        type="text"
        placeholder="Titre "
        class="field__input"
      />
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.title" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': errors.content.length }"
      v-on:keypress="errors.content = []"
    >
      <label class="field__label"></label>
      <input
        v-model="content"
        type="text"
        placeholder="Description "
        class="field__input"
        
      />
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.content" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field_image"
      v-bind:class="{ 'field--error': errors.image.length }"
      v-on:input="errors.image = []"
    >
      <label class="field__label">Image (JPEG, PNG) </label>
      <input
        ref="image"
        type="file"
        accept="image/jpeg, image/png"
        class="field__input_image"
        
      />
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.image" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': errors.dateStart.length }"
      v-on:keypress="errors.dateStart = []"
    >
      <label class="field__label"></label>
      <input
        v-model="dateStart"
        type="text"
        placeholder="Jour du Tournoi 18/08/2020"
        class="field__input"
      />
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.dateStart" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': errors.timeStart.length }"
      v-on:keypress="errors.timeStart = []"
    >
      <label class="field__label"></label>
      <input
        v-model="timeStart"
        type="text"
        placeholder="Heure du Tournoi  10H00"
        class="field__input"
      />
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.timeStart" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': errors.maxParticipants.length }"
      v-on:keypress="errors.maxParticipants = []"
    >
      <label class="field__label"></label>
      <input
        v-model="maxParticipants"
        type="text"
        placeholder="Nombre de Participants  20 - 120"
        class="field__input"
      />
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.maxParticipants" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': errors.gameMode.length }"
      v-on:keypress="errors.gameMode = []"
    >
      <label class="field__label"></label>
      <input
        v-model="gameMode"
        type="text"
        placeholder="Modes de Jeu  Battle Royale/Multiplayer"
        class="field__input"
      />
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.gameMode" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div
      class="field"
      v-bind:class="{ 'field--error': errors.details.length }"
    >
      <label class="field__label">Plateformes de Jeu </label>
      <div class="detail-list">
        <div v-for="detail in detailItems" v-bind:key="detail.id">
          <input v-bind:id="`detail-${detail.id}`" type="checkbox" v-model="details" v-bind:value="detail.id" />
          <label v-bind:for="`detail-${detail.id}`">{{ detail.name }}</label>
        </div>
      </div>
      <ul class="field__error-list">
        <li v-for="(error, index) in errors.details" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div v-if="errors.length" class="alert error">
      <span v-for="(error, index) in errors" v-bind:key="index">{{
        error
      }}</span>
    </div>
    <button type="submit" class="button-createTournement">Sauvegarder</button>
  </form>
</template>

<script>
import ApiClient from "@/services/ApiClient.js";
import DetailService from "@/services/DetailService.js";

export default {
  name: "CreateTournamentForm",
  data() {
    return {
      title: null,
      content: null,
      image: null,
      dateStart: null,
      timeStart: null,
      maxParticipants: null,
      gameMode: null,
      details: [],
      errors: {
        title: [],
        content: [],
        image: [],
        dateStart: [],
        timeStart: [],
        maxParticipants: [],
        gameMode: [],
        details: [],
      },
      mediaId: null,
      detailItems: [],
    };
  },
  mounted() {
    DetailService.getList().then(detailList => (this.detailItems = detailList));
  },
  computed: {
    userLoggedIn() {
      return !!this.$store.state.user;
    }
  },
  methods: {
    hasMedia() {
      let hasMedia = false;

      if (this.$refs.image) {
        hasMedia = this.$refs.image.files.length !== 0;
      }

      return hasMedia;
    },
    onSubmit() {
      if (this.isValidForm()) {
        if (this.hasMedia()) {
          this.createMedia().then(this.createTournament);
        } else {
          this.createTournament();
        }
      }
    },
    createMedia() {
      let image = this.$refs.image.files[0];

      let formData = new FormData();
      formData.append("file", image);

      let createImageRequest = ApiClient.post("/wp/v2/media", formData);

      createImageRequest.then(response => {
        this.mediaId = response.data.id;
      });

      createImageRequest.catch(() => {
        this.$store.dispatch("notify", {
          message:
            "Nous avons rencontré un problème lors de votre proposition de tournoi. Si le problème persiste, n'hésitez pas à contacter le support.",
          status: "error"
        });
      });

      return createImageRequest;
    },
    createTournament() {
      let tournament = {
        title: this.title,
        meta: {
          dateStart: this.dateStart,
          timeStart: this.timeStart,
          gameMode: this.gameMode,
          maxParticipants: this.maxParticipants,
        },
        content: this.content,
        status: "pending",
        "tournament-details": this.details,
      };

      if (this.mediaId) {
        tournament.featured_media = this.mediaId;
      }

      let createTournamentRequest = ApiClient.post("/wp/v2/tournaments", tournament);

      createTournamentRequest.then(() => {
        this.$store.dispatch("notify", {
          message: "Le tournoi a été proposé.",
          status: "success"
        });

        this.$router.push({ name: "home" });
      });

      createTournamentRequest.catch(error => {
        this.errors.push(error.response.data.message);
      });

      return createTournamentRequest;
    },
    isValidForm() {
      let isValidForm = true;

      isValidForm = this.isValidTitle() && isValidForm;

      isValidForm = this.isValidContent() && isValidForm;

      isValidForm = this.isValidDateStart() && isValidForm;

      isValidForm = this.isValidTimeStart() && isValidForm;

      isValidForm = this.isValidMaxParticipants() && isValidForm;

      isValidForm = this.isValidGameMode() && isValidForm;

      isValidForm = this.isValidImage() && isValidForm;

      isValidForm = this.isValidDetails() && isValidForm;

      return isValidForm;
    },
    isValidTitle() {
      let isValidTitle = true;

      this.errors.title = [];

      if (!this.title) {
        this.errors.title.push("Le titre doit être renseigné.");
      } else if (!this.title.trim().length) {
        this.errors.title.push("Le titre ne doit pas être vide.");
      }

      if (this.errors.title.length) {
        isValidTitle = false;
      }

      return isValidTitle;
    },
    isValidDateStart() {
      let isValidDateStart = true;

      this.errors.dateStart = [];

      let dateStart = parseInt(this.dateStart, 10);

      if (isNaN(dateStart)) {
        this.errors.dateStart.push(
          "Le temps de jeu doit être numérique."
        );
      } else if (dateStart < 0) {
        this.errors.dateStart.push(
          "Le temps de jeu ne peut pas être négatif."
        );
      } else if (dateStart === 0) {
        this.errors.dateStart.push(
          "Le temps de jeu ne peut pas être nul."
        );
      }

      if (this.errors.dateStart.length) {
        isValidDateStart = false;
      }

      return isValidDateStart;
    },
    isValidTimeStart() {
      let isValidTimeStart = true;

      this.errors.timeStart = [];

      let timeStart = parseInt(this.timeStart, 10);

      if (isNaN(timeStart)) {
        this.errors.timeStart.push(
          "Le jour doit être numérique."
        );
      } else if (timeStart < 0) {
        this.errors.timeStart.push(
          "Le jour choisi ne peut pas être négatif."
        );
      } else if (timeStart === 0) {
        this.errors.timeStart.push(
          "Le jour choisi ne peut pas être nul."
        );
      }

      if (this.errors.timeStart.length) {
        isValidTimeStart = false;
      }

      return isValidTimeStart;
    },
    isValidMaxParticipants() {
      let isValidMaxParticipants = true;

      this.errors.maxParticipants = [];

      let maxParticipants = parseInt(this.maxParticipants, 10);

      if (isNaN(maxParticipants)) {
        this.errors.maxParticipants.push(
          "Le nombre de participants doit être numérique."
        );
      } else if (maxParticipants < 0) {
        this.errors.maxParticipants.push(
          "Le nombre de participants ne peut pas être négatif."
        );
      } else if (maxParticipants === 0) {
        this.errors.maxParticipants.push(
          "Le nombre de participants ne peut pas être nul."
        );
      }

      if (this.errors.maxParticipants.length) {
        isValidMaxParticipants = false;
      }

      return isValidMaxParticipants;
    },
    isValidGameMode() {
      let isValidGameMode = true;

      this.errors.gameMode = [];

      if (!this.gameMode) {
        this.errors.gameMode.push("Le Mode de Jeu doit être renseigné.");
      } else if (!this.gameMode.trim().length) {
        this.errors.gameMode.push("Le Mode de Jeu ne doit pas être vide.");
      }

      if (this.errors.gameMode.length) {
        isValidGameMode = false;
      }

      return isValidGameMode;
    },
    isValidImage() {
      let isValidImage = true;

      this.errors.image = [];

      if (this.hasMedia()) {
        let imageData = this.$refs.image.files[0];

        if (imageData.type !== "image/png" && imageData.type !== "image/jpeg") {
          this.errors.image.push(
            "Seules les images de type JPEG ou PNG sont acceptées."
          );
        }

        isValidImage = this.errors.image.length === 0;
      }

      return isValidImage;
    },
    isValidDetails() {
      let isValidDetails = true;

      this.errors.details = [];

      if (this.details.length === 0) {
        this.errors.details.push("Vous devez sélectionner au moins une choix");
      }

      isValidDetails = this.errors.details.length === 0;

      return isValidDetails;
    },
    isValidContent() {
      let isValidContent = true;

      this.errors.content = [];

      if (!this.content) {
        this.errors.content.push(
          "La description du tournoi doit être renseignée."
        );
      } else if (!this.content.trim().length) {
        this.errors.content.push(
          "La description du tournoi ne doit pas être vide."
        );
      }

      if (this.errors.content.length) {
        isValidContent = false;
      }

      return isValidContent;
    }
  }
};
</script>

<style>
</style>