import Vue from "vue";
import Vuex from "vuex";
import VueAnalytics from "vue-analytics";
// import * as actions from "./actions";
import * as getters from "./getters";
import modules from "./modules";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

Vue.use(VueAnalytics, {
  id: "UA-122601594-2"
});

Sentry.init({
  dsn: "https://c2041cd0a20e4c7cb6430f1472df397e@sentry.io/1463310",
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true
    })
  ]
});

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules,
  strict: false
});
