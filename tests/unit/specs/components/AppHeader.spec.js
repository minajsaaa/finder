import { mount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader";
import networks from "@/networks";

describe(`AppHeader`, () => {
  let $router, $route, wrapper, localThis;
  const network = networks[0].value;

  beforeEach(() => {
    $router = {
      push: jest.fn()
    };

    $route = {
      params: {
        network
      }
    };
    wrapper = mount(AppHeader, {
      mocks: {
        $router,
        $route
      },
      stubs: [`router-link`]
    });
  });

  it(`AppHeader Snapshot`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
  describe(`Tests using Localthis`, () => {
    beforeEach(() => {
      localThis = {
        $route: {
          params: {
            network
          }
        },
        $router: {
          push: jest.fn()
        },
        curNetwork: ``
      };
    });
    it(`mounted: set network`, () => {
      AppHeader.mounted.call(localThis);
      expect(localThis.curNetwork).toEqual(network);
    });

    it(`method: setNetwork`, () => {
      wrapper.find(".select-network select").setValue(network);
      expect(wrapper.vm.curNetwork).toEqual(network);
    });

    it(`method: search`, () => {
      wrapper.find("form").trigger("submit");
      expect(wrapper.vm.$router.push).toHaveBeenCalled();
    });
  });
});
