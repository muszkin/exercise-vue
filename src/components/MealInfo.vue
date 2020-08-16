<template>
  <div class="row" style="width: 100%;">
    <div class="card">
      <div class="card-header">
        {{ meal.strMeal }} <button class="btn-sm btn-warning" @click="close">Close</button>
      </div>
      <div class="card-body">
        <ul class="list-group" style="display: flex;flex-direction: row;">
          <li class="list-group-item"><img :src="meal.strMealThumb" width="320"/></li>
          <li class="list-group-item">{{ meal.strInstructions }}
            <br/><br/>
            <span v-if="meal.strTags">Tags: {{ meal.strTags }}</span>
            <br/><br/>
            <span v-if="meal.strDrinkAlternate">Alternate drinks: {{ meal.strDrinkAlternate }}</span>
          </li>
          <li class="list-group-item" width="100%">Ingredients:
            <ul class="list-group">
              <li v-for="(ingredient, index) in ingredients" :key="index" class="list-group-item"><strong>{{ ingredient.name }}</strong> - {{ ingredient.measure }}</li>
            </ul>
          </li>
          <li class="list-group-item"><a :href="meal.strSource" target="_blank"> Source </a></li>
          <li v-if="meal.strYoutube" class="list-group-item"><a :href="meal.strYoutube" target="_blank"> Video </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MealInfo",
  computed: {
    ...mapGetters({
      meal: 'getCurrentMeal'
    }),
    ingredients() {
      let ingredientsList = []
      for (let x = 1;x <= 20; x++) {
        let ingredientKey = `strIngredient${x}`
        let measureKey = `strMeasure${x}`
        if (this.meal[ingredientKey]) {
          ingredientsList.push({name: this.meal[ingredientKey], measure: this.meal[measureKey]})
        }
      }
      return ingredientsList
    }
  },
  methods: {
    ...mapActions({
      close: 'closeCurrentMeal'
    })
  }
}
</script>

<style scoped>

</style>