<template>
  <body class="container">
     
   
   
     <h1 class="connexion-title">Connexion</h1>
    <LoginForm />
    <FooterLayout />
         
  </body>
</template>

<script>
import LoginForm from "../components/forms/LoginForm.vue";
import FooterLayout from "@/components/FooterLayout.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
    FooterLayout
    
  }
};
</script>

<style>
</style>
