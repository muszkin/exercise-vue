<template>
  <div class="card" style="width: 20%;">
    <div class="card-header" @click="$emit('setCurrentMeal')">
      {{ title }}
      <button @click="$emit('addToFavorites', {index: index})" class="btn-sm btn-info">Add</button>
    </div>
    <div class="card-body">
      <img :src="img" width="80%" @click="$emit('setCurrentMeal')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Meal",
  props: [
      'title',
      'img',
      'index'
  ]
}
</script>

<style scoped>

</style>