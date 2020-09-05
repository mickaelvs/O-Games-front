<template>
  <body class="container">
    <h1 class="h1-inscription">Inscription</h1>
    <RegisterForm />
    <FooterLayout />
  </body>
</template>

<script>
import RegisterForm from "../components/forms/RegisterForm.vue";
import FooterLayout from "@/components/FooterLayout.vue";

export default {
  name: "Register",
  components: {
    RegisterForm,
     FooterLayout
  }
};
</script>

<style>
</style>
