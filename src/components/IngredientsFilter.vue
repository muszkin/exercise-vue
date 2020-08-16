<template>
  <div class="row filters">
    <span class="m-5">Ingredients:</span>
    <ul class="list-group">
      <li v-for="(ingredient,index) in ingredients" :key="index" @click="updateIngredientsFilter(ingredient)" :class="getClass(ingredient)" class="list-group-item">{{ ingredient }}</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "IngredientsFilter",
  computed: {
    ...mapGetters({
      ingredients: 'getAvailableIngredients',
      ingredientFilter: 'getCurrentIngredients'
    })
  },
  methods: {
    ...mapActions({
      updateIngredientsFilter: 'updateIngredientsFilter'
    }),
    getClass: function(ingredient) {
      if (this.ingredientFilter.indexOf(ingredient) !== -1) {
        return 'bg-danger'
      }
    }
  }
}
</script>

<style scoped>

</style>