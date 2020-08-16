<template>
  <div class="row" style="display: flex;flex-direction: row;">
    <MealInfo v-if="currentMeal" />
    <Meal v-for="(meal,index) in currentVisibleMeals" :img="meal.strMealThumb" :title="meal.strMeal" :key="index" @addToFavorites="addToFav(meal)" @setCurrentMeal="setCurrentMeal(meal)"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Meal from "@/components/Meal";
import MealInfo from "@/components/MealInfo";

export default {
  name: "MealsList",
  components: {MealInfo, Meal},
  computed: {
    ...mapGetters({
      currentVisibleMeals: 'getCurrentVisibleMeals',
      currentMeal: 'getCurrentMeal'
    })
  },
  methods: {
    ...mapActions({
      addFavoriteMeal: 'addFavoriteMeal',
      setCurrentMeal: 'setCurrentMeal'
    }),
    addToFav: function(meal) {
      this.addFavoriteMeal(meal)
    }
  }
}
</script>

<style scoped>

</style>