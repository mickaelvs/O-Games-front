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

<style lang="scss">

.container {
    width: 100%;
    margin: auto;
    margin-top: 3%;
    position: absolute;
    background: linear-gradient( black, #3C5A14);
  }

</style>
