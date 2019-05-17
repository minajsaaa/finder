import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import * as getters from "@/store/getters";
import PageTransaction from "@/pages/PageTransaction";
import mockState from "../store/mockState";

describe(`PageTransaction`, () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper, $store, $route, mockStore, localThis;
  const defaultHash =  `B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2`
  beforeEach(() => {
    // make basic wrapper
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

    wrapper = shallowMount(PageTransaction, {
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
          queryTx: jest.fn()
        }
      });
    });

    it(`Snapshot: defaultHash`, () => {
      wrapper = shallowMount(PageTransaction, {
        localVue,
        store: mockStore,
        mocks: {
          $route: {
            params: {
              hash: defaultHash
            }
          }
        },
        stubs: [`router-link`]
      });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });
});
