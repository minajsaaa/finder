import networks from "@/networks";
import { mount } from "@vue/test-utils";
import AppPageNotFound from "@/components/AppPageNotFound";

describe(`AppPageNotFound`, () => {
  let $route, wrapper;

  beforeEach(() => {
    $route = {
      params: {
        network: networks[0].value,
        keyword: "xxxx"
      }
    };

    wrapper = mount(AppPageNotFound, {
      mocks: {
        $route
      },
      stubs: [`router-link`]
    });
  });

  it(`AppPageNotFound Snapshot`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
