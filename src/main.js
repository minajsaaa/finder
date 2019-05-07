import _Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";

import router from "./router";
import _Store from "./store";

export const startApp = async (store = _Store, Vue = _Vue) => {
  Vue.use(Vuelidate);

  Vue.config.productionTip = false;

  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
};

startApp();
