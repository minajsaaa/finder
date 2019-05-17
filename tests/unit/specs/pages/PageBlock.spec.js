import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import * as getters from "@/store/getters";
import PageBlock from "@/pages/PageBlock";
import mockState from "../store/mockState";

describe(`PageBlock`, () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper, $store, $route, mockStore, localThis;
  const defaultBlock = 42
  const errorBlock = 43
  beforeEach(() => {
    $store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: {
        block: {}
      }
    };

    $route = {};

    wrapper = shallowMount(PageBlock, {
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
        commit: jest.fn(),
        dispatch: jest.fn(),
        actions: {
          setBlockLoadedFalse: jest.fn(),
          fetchBlock: jest.fn()
        }
      });
    });

    it(`Snapshot: defaultBlock`, () => {
      wrapper = shallowMount(PageBlock, {
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

    it(`Snapshot: load Error`, () => {
      wrapper = shallowMount(PageBlock, {
        localVue,
        mocks: {
          $store: {
            commit: jest.fn(),
            dispatch: jest.fn(),
            getters: {
              block: {
                blocks: {},
                loading: false,
                loaded: true,
                error: new Error(`err`)
              }
            }
          },
          $route: {
            params: {
              block: `99999999999999999`
            }
          },
          setBlockLoadedFalse: jest.fn(),
          fetchBlock: jest.fn()
        },
        stubs: [`router-link`]
      });
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });

  describe(`Using localThis`, () => {
    beforeEach(() => {
      localThis = {
        $route: {
          params: {
            block: defaultBlock
          }
        },
        block: mockState.block,
        setBlockLoadedFalse: jest.fn(),
        fetchBlock: jest.fn()
      };
    });
    it(`Computed: blockData with defaultBlock`, () => {
      const blockHeight = localThis.$route.params.block;
      expect(PageBlock.computed.blockData.call(localThis)).toBe(
        mockState.block.blocks[blockHeight].block
      );
    });

    it(`Computed: no blockData with errorBlock`, () => {
      localThis.$route.params.block = errorBlock;

      expect(PageBlock.computed.blockData.call(localThis)).toEqual({
        last_commit: {
          block_id: {}
        },
        header: {}
      });
    });

    it(`Computed: blockMeta with defaultBlock`, () => {
      const blockHeight = localThis.$route.params.block;
      expect(PageBlock.computed.blockMeta.call(localThis)).toBe(
        mockState.block.blocks[blockHeight].block_meta
      );
    });

    it(`Computed: no blockMeta with errorBlock`, () => {
      localThis.$route.params.block = errorBlock;

      expect(PageBlock.computed.blockMeta.call(localThis)).toEqual({
        block_id: {
          hash: ``
        }
      });
    });

    it(`Watch: $route`, () => {
      PageBlock.watch[`$route`].call(localThis);

      expect(localThis.setBlockLoadedFalse).toHaveBeenCalled();
      expect(localThis.fetchBlock).toHaveBeenCalled();
    });
  });
});
