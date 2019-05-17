import networks from "@/networks";
import { mount } from "@vue/test-utils";
import AppNotFound from "@/components/AppNotFound";

describe(`AppNotFound`, () => {
  let $route, wrapper;

  beforeEach(() => {
    $route = {
      params: {
        network: networks[0].value,
        keyword: "xxxx"
      }
    };

    wrapper = mount(AppNotFound, {
      mocks: {
        $route
      },
      stubs: [`router-link`]
    });
  });

  it(`AppNotFound Snapshot`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
