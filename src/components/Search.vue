<template>
  <div class="row">
    <input type="search" @change="query($event.target.value)" @keydown="query($event.target.value)" class="form-control"/>
  </div>
</template>

<script>

export default {
  name: "Search",
  methods: {
    query: function(value) {
      if (value.length > 1) {
        this.$store.dispatch('searchByString', value)
      }
    }
  }
}
</script>

<style scoped>

</style>