import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import * as getters from "@/store/getters";
import PageAccount from "@/pages/PageAccount";
import mockState from "../store/mockState";

describe(`PageAccount`, () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let wrapper, $store, $route, mockStore, localThis;
  const defaultAddress = `terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6`;
  const errorAddress = `terra1j0ykfs05q33cqyag297k6sa24ukq5jfm0wcr4l`;
  beforeEach(() => {
    $store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: {
        block: {},
        account: {}
      },
      state: mockState
    };

    $route = {};

    wrapper = shallowMount(PageAccount, {
      localVue,
      mocks: {
        $store,
        $route
      }
    });
  });

  describe(`Snapshot`, () => {
    beforeEach(() => {
      mockStore = new Vuex.Store({
        state: mockState,
        getters,
        actions: {
          fetchAccount: jest.fn()
        }
      });
    });
    it(`Snapshot: defaultAddress`, () => {
      // snapshot with defaultAddress
      wrapper = shallowMount(PageAccount, {
        localVue,
        store: mockStore,
        mocks: {
          $route: {
            params: {
              address: defaultAddress // default snapshot address
            }
          }
        },
        stubs: [`router-link`]
      });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it(`Snapshot: errorAddress(inactive)`, () => {
      // snapshot with errorAddress
      wrapper = shallowMount(PageAccount, {
        localVue,
        store: mockStore,
        mocks: {
          $route: {
            params: {
              address: errorAddress
            }
          }
        },
        stubs: [`router-link`]
      });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it(`snapshot with error`, () => {
      // snapshot with errorAddress
      wrapper = shallowMount(PageAccount, {
        localVue,
        mocks: {
          $store: {
            commit: jest.fn(),
            dispatch: jest.fn(),
            getters: {
              account: {
                accounts: {},
                loading: false,
                loaded: true,
                error: new Error(`err`)
              }
            }
          },
          $route: {
            params: {
              address: `erroraddress`
            }
          }
        },
        stubs: [`router-link`]
      });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });

  describe(`Computed`, () => {
    beforeEach(() => {
      localThis = {
        $route: {
          params: {
            address: defaultAddress
          }
        },
        account: mockState.account
      };
    });
    it(`Computed: currentAccount with defaultAddress`, () => {
      const address = defaultAddress;
      expect(PageAccount.computed.currentAccount.call(localThis)).toBe(
        mockState.account.accounts[address]
      );
    });

    it(`Computed: currentAccount with errorAddress`, () => {
      localThis = {
        $route: {
          params: {
            address: errorAddress
          }
        },
        account: mockState.account
      };

      expect(PageAccount.computed.currentAccount.call(localThis)).toBe(
        undefined
      );
    });
  });
});
