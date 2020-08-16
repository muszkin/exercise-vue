<template>
  <div class="row filters">
    <span class="m-5">Categories</span>
    <ul class="list-group">
      <li v-for="(category,index) in categories" :key="index" @click="updateCategoryFilter(category)" :class="getClass(category)" class="list-group-item">{{ category }}</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CategoriesFilter",
  computed: {
    ...mapGetters({
      categories: 'getAvailableCategories',
      categoryFilter: 'getCurrentCategories'
    })
  },
  methods: {
    ...mapActions({
      updateCategoryFilter: 'updateCategoryFilter'
    }),
    getClass: function(category) {
      if (this.categoryFilter.indexOf(category) !== -1) {
        return 'bg-danger'
      }
    }
  }
}
</script>

<style scoped>

</style>