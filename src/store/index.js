import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteId: ''
  },
  mutations: {
    setSiteId(state, id) {
      state.siteId = id
    },
  },
  actions: {
    //функция удаления siteId (выход)
    clearSiteId({commit}) {
      commit('setSiteId','')
      localStorage.removeItem('siteId')
    },
    // функция авторизации
    async login({commit, dispatch}, id) {
        let resp
      // проверяем ответ от сервера на ошибку
      try{
        resp = await axios.get('https://track-api.leadhit.io/client/test_auth',{
          headers: {
            'Api-Key': `${id}:eEZn8u05G3bzRpdL7RiHCvrYAYo`,
            'Leadhit-Site-Id': id
          }
        })}
      catch (err) {
          // в случае ошибки удаляем siteId (logout)
          dispatch('clearSiteId')
          console.error(err)
      }
      // в случае успешного ответа от сервера авторизовываем пользователя и устанавливаем siteId
      if(resp && resp.status === 200 && resp.data.message === 'ok') {
        localStorage.setItem('siteId', id)
        commit('setSiteId', id)
        return true
      }
      // если ответ от сервера неправильный, то удаляем siteId
      dispatch('clearSiteId')
      console.log(resp)
      return false
    },
    // функция инициализации страници
    async pageInit({dispatch}) {
      const siteId = localStorage.getItem('siteId')
      // при перезагрузке страници проверяем валидность siteId
      if(!siteId || siteId.length !== 24 ) {
        dispatch('clearSiteId')
        return
      }
      // пробуем отправить siteId для авторизации через API
     await dispatch('login', siteId)
    }

  },
  modules: {
  }
})
