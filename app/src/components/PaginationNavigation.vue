<template>
  <div class="pagination">
    <router-link
      v-if="pageNumber > 1"
      v-bind:to="{ name: routeName, params: { pageNumber: pageNumber - 1 } }"
      class="pagination__previous button"
      >Précédent</router-link
    >
    <router-link
      v-if="pageNumber < totalPages"
      v-bind:to="{ name: routeName, params: { pageNumber: pageNumber + 1 } }"
      class="pagination__next button"
      >Suivant</router-link
    >
  </div>
</template>

<script>
export default {
  name: "PaginationNavigation",
  props: {
    routeName: {
      type: String,
      required: true
    },
    pageNumber: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss">
/* COMPONENT PaginationNavigation */

.pagination {
  display: flex;
  justify-content: space-between;

  /**
   * Force flex child element to align right
   *
   * @link https://stackoverflow.com/questions/35269947/css-align-one-item-right-with-flexbox
   */
  &__next {
    margin-left: auto;
  }
}
</style>
