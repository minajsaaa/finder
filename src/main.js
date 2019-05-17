import _Vue from "vue";
import Router from "vue-router";
import Vuelidate from "vuelidate";

import App from "./App.vue";
import routes from "./routes";
import _Store from "./store";

export const startApp = async (store = _Store, Vue = _Vue) => {
  Vue.use(Vuelidate);
  Vue.use(Router);

  const router = new Router(routes);

  Vue.config.productionTip = false;

  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
};

startApp();
