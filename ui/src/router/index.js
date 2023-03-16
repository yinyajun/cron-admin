import Vue from 'vue'
import Router from 'vue-router'

import Cron from '../views/cron/Cron'

import Schedule from '../views/cron/Schedule'
import Running from '../views/cron/Running'
import Dashboard from '../views/cron/Dashboard'
import History from '../views/cron/History'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Cron',
      component: Cron,
      children: [{
          path: '/cron/schedule',
          name: 'Schedule',
          component: Schedule
        },
        {
          path: '/cron/running',
          name: 'Running',
          component: Running
        },
        {
          path: '/cron/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/cron/history',
          name: 'History',
          component: History
        },
      ]
    }
  ]
})
