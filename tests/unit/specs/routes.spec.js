import { mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import networks from "@/networks";
import routes from "@/routes.js";
import Router from "vue-router";
import PageAccount from "@/pages/PageAccount";
import PageBlock from "@/pages/PageBlock";
import PageIndex from "@/pages/PageIndex";
import PageTransaction from "@/pages/PageTransaction";
import AppPageNotFound from "@/components/AppPageNotFound";

jest.mock("@/pages/PageAccount", () => ({
  name: "PageAccount",
  render: h => h("div")
}));
jest.mock("@/pages/PageBlock", () => ({
  name: "PageBlock",
  render: h => h("div")
}));
jest.mock("@/pages/PageIndex", () => ({
  name: "PageIndex",
  render: h => h("div")
}));
jest.mock("@/pages/PageTransaction", () => ({
  name: "PageTransaction",
  render: h => h("div")
}));
jest.mock("@/components/AppPageNotFound", () => ({
  name: "AppPageNotFound",
  render: h => h("div")
}));

window.scrollTo = jest.fn().mockImplementation((x, y) => {
  const w = window;
  w.scrollY = y;
  w.pageYOffset = y;
});

describe("routes", () => {
  it("renders a child component via routing", async () => {
    const localVue = createLocalVue();
    localVue.use(Router);
    const router = new Router(routes);

    const $store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: {
        block: {}
      }
    };
    const wrapper = mount(App, {
      localVue,
      router,
      mocks: {
        $store
      }
    });

    await router.push(`/`);
    await expect(wrapper.find(PageIndex).exists()).toBe(true);
    await router.push(
      `/${
        networks[0].value
      }/account/terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6`
    );
    await expect(wrapper.find(PageAccount).exists()).toBe(true);
    await router.push(`/${networks[0].value}/blocks/42`);
    await expect(wrapper.find(PageBlock).exists()).toBe(true);
    await router.push(
      `/${
        networks[0].value
      }/tx/7A26AACC42F6CD22AB939D39134D5E7E51B2BBEC1D8FAF36CAB7E72D9BBAC310`
    );
    await expect(wrapper.find(PageTransaction).exists()).toBe(true);
    await router.push(`/shouldShowPageNotFound`);
    await expect(wrapper.find(AppPageNotFound).exists()).toBe(true);
  });
});
