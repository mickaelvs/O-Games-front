<template>
<body class="container">
  

  <main class="main-container">
    <NewsList />
  </main>
<FooterLayout />
  </body>
</template>

<script>
import NewsList from "../components/NewsList.vue";
import FooterLayout from "@/components/FooterLayout.vue";
export default {
  name: "NewsHome",
  components: {
    NewsList,
    FooterLayout
  }
};
</script>