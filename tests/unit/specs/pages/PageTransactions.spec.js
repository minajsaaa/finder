import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import * as getters from "@/store/getters";
import PageTransactions from "@/pages/PageTransactions";
import mockState from "../store/mockState";

describe(`PageTransactions`, () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper, $store, $route, mockStore;
  const defaultBlock = 719
  beforeEach(() => {
    $store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: {
        block: {},
        account: {},
        tx: {}
      }
    };

    $route = {};

    wrapper = shallowMount(PageTransactions, {
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
          fetchBlock: jest.fn(),
          queryTxs: jest.fn()
        }
      });
    });

    it(`Snapshot: with defaultBlock`, () => {
      wrapper = shallowMount(PageTransactions, {
        localVue,
        store: mockStore,
        mocks: {
          $route: {
            params: {
              block: defaultBlock
            }
          }
        },
        stubs: [`router-link`]
      });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });
});
