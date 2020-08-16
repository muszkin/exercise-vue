<template>
  <div class="row">
    <ul class="list-group">
      <li v-for="(favorite,index) in favorites" :key="index" class="list-group-item">
        <img :src="favorite.strMealThumb" width="25%"/>{{ favorite.strMeal }}
        <button @click="removeFavoriteMeal(favorite)" class="btn-sm btn-danger">Remove</button>
        <button @click="search(favorite.strMeal)" class="btn-sm btn-info">Look</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Favorites",
  computed: {
    ...mapGetters({
      favorites: 'getFavoriteMeals'
    })
  },
  methods: {
    ...mapActions({
      removeFavoriteMeal: 'removeFavoriteMeal'
    }),
    search: function(value) {
      this.$store.dispatch('searchByString', value)
    }
  }
}
</script>

<style scoped>

</style>