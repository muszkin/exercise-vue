<template>
  <div id="app container-fluid">
    <div class="row">
      <div class="left-row col-4">
        <CategoriesFilter/>
        <AreasFilter/>
        <IngredientsFilter/>
        <Favorites/>
      </div>
      <div class="col-8">
        <Search/>
        <MealsList/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoriesFilter from "@/components/CategoriesFilter";
import AreasFilter from "@/components/AreasFilter";
import IngredientsFilter from "@/components/IngredientsFilter";
import Search from "@/components/Search";
import MealsList from "@/components/MealsList";
import Favorites from "@/components/Favorites";

export default {
  name: 'MealDb',
  components: {
    Favorites,
    MealsList,
    Search,
    IngredientsFilter,
    CategoriesFilter,
    AreasFilter
  },
  mounted() {
    this.$store.dispatch("initialLoad")
  },
  computed: {
    ...mapGetters({
      currentProducts: 'getCurrentMeals',
      currentVisibleProducts: 'getCurrentVisibleMeals',
      availableIngredients: 'getAvailableIngredients',
      availableAreas: 'getAvailableAreas',
      availableCategories: 'getAvailableCategories',
      favoriteMeals: 'getFavoriteMeals',
      currentCategories: 'getCurrentCategories',
      currentAreas: 'getCurrentAreas',
      currentIngredients: 'getCurrentIngredients'
    })
  },
  methods: {
    ...mapActions({
      search: 'searchByString',
      addFavoriteMeal: 'addFavoriteMeal',
      removeFavoriteMeal: 'removeFavoriteMeal',
      updateCategoryFilter: 'updateCategoryFilter',
      updateAreaFilter: 'updateAreaFilter',
      updateIngredientsFilter: 'updateIngredientsFilter'
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
