<template>
  <div>
    <div class="page-header">
      <div></div>
      <h1>Аналитика</h1>
      <button @click="logout" class="logout-btn">Выйти</button>
    </div>

    <div class="chart-container">
      <h2 class="chart-header">Аналитика по визитам</h2>
      <Chart/>
    </div>

  </div>
</template>

<script>
  import Chart from '../components/Chart';
  export default {
    components: {Chart},
    beforeMount() {
      this.$store.dispatch('pageInit')
    },
    methods: {
      logout() {
        this.$store.dispatch('clearSiteId')
            .then(()=> {
              this.$router.push('/')
            })            .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart-container {
  border: 1px solid grey;
  border-radius: 6px;
}
.logout-btn {
  height: 24px;
}

</style>