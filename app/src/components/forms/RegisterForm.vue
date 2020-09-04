<template>
  <form v-on:submit.prevent="onSubmit">
    <fieldset>
      <div class="field">
        <label class="field__label"></label><br>
        <input
          v-model="email"
          class="field__input"
          type="text"
          placeholder="Adresse e-mail"
        />
      </div>
    

      <div class="field">
        <label class="field__label"></label><br>
        <input
          v-model="username"
          class="field__input"
          type="text"
          placeholder="Identifiant"
        />
      </div>
     
      <div class="field">
        <label class="field__label"></label><br>
        <input
          v-model="password"
          class="field__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="field">
        <label class="field__label"></label><br>
        <input
          v-model="passwordValidation"
          class="field__input"
          type="password"
          placeholder="Confirmez le mot de passe"
        />
      </div>
    </fieldset>
    <div
      class="alert error"
      v-for="(error, index) in errors"
      v-bind:key="index"
    >
      {{ error }}
    </div>
    <button class="button-register">Créer le compte</button>
     <FooterLayout />
  </form>
  
</template>

<script>
import ApiClient from "@/services/ApiClient.js";
import FooterLayout from "@/components/FooterLayout.vue";
export default {
  name: "RegisterForm",
  components: FooterLayout,
  data() {
    return {
      email: null,
      username: null,
      password: null,
      passwordValidation: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.isValidForm()) {
        let registerUserRequest = ApiClient.post("/wp/v2/users/register", {
          username: this.username,
          email: this.email,
          password: this.password
        });
        registerUserRequest.then(() => {
          this.$store.dispatch("notify", {
            message: "Votre compte a bien été créé.",
            status: "success"
          });
          this.$router.push({ name: "login" });
        });
      }
    },
    isValidForm() {
      this.errors = [];
      if (!this.email) {
        this.errors.push("L'adresse e-mail est requise.");
      }
      if (!this.username) {
        this.errors.push("L'identifiant est requis.");
      }
      if (!this.password) {
        this.errors.push("Le mot de passe est requis.");
      }
      if (!this.passwordValidation) {
        this.errors.push("La validation du mot de passe n'est pas correcte.");
      } else if (this.password !== this.passwordValidation) {
        this.errors.push("La validation du mot de passe n'est pas correcte.");
      }
      return this.errors.length === 0;
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/register.scss";
</style>
