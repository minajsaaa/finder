import Vue from "vue"
import Router from "vue-router"

import Index from "../pages/PageIndex"
import Block from "../pages/PageBlock"
import Transactions from "../pages/PageTransactions"
import Transaction from "../pages/PageTransaction"
import Account from "../pages/PageAccount"
import AppPageNotFound from "../components/AppPageNotFound"
Vue.use(Router)

const routes = [
  { path: "/", component: Index },
  { path: "/blocks/:block", name: "block", component: Block },
  { path: "/txs/:block", name: "txs", component: Transactions },
  { path: "/tx/:hash", name: "tx", component: Transaction },
  { path: "/account/:address", name: "account", component: Account },
  { path: `*`,  component: AppPageNotFound }
]

export default new Router({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
