import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Game from '@/components/game'
import Game1 from '@/components/game1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/game1',
      name: 'game1',
      component: Game1
    },

  ]
})
