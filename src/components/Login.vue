<template>
  <div>
    <h1>LeadHit</h1>
    <form class="login" @submit.prevent="login">
      <input required v-model="id" type="text" placeholder="id сайта" @focus="error = ''" class="input-id"/>
      <div v-if="error" class="error-block">{{error}}</div>
      <hr/>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      id: '',
      error: ''
    }
  },
  methods: {

    login: function () {
      let id= this.id
      if(id.length !== 24) {
        this.error = 'id сайта должен содержать 24 символа'
        return
      }
      //вызов экшена для авторизации
      this.$store.dispatch('login', id)
      .then(()=> this.$router.push('/analytics'))
          .catch(err => console.log(err))
    }
  }

}
</script>

<style scoped>
.input-id {
  margin-bottom: 24px;
}
 .error-block {
   color: red;
 }
</style>