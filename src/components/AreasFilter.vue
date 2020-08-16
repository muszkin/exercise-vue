<template>
  <div class="row filters">
    <span class="m-5">Areas</span>
    <ul class="list-group">
      <li v-for="(area,index) in areas" :key="index" @click="updateAreaFilter(area)" :class="getClass(area)" class="list-group-item">{{ area }}</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AreasFilter",
  computed: {
    ...mapGetters({
      areas: 'getAvailableAreas',
      areaFilter: 'getCurrentAreas'
    })
  },
  methods: {
    ...mapActions({
      updateAreaFilter: 'updateAreaFilter'
    }),
    getClass: function(area) {
      if (this.areaFilter.indexOf(area) !== -1) {
        return 'bg-danger'
      }
    }
  }
}
</script>

<style scoped>

</style>