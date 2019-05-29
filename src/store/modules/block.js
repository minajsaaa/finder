import { get } from "lodash";

export default apiClient => {
  const state = {
    blocks: {},
    loading: false,
    loaded: false,
    error: {}
  };

  const actions = {
    async fetchBlock({ state, commit }, { network, block }) {
      commit("setBlockLoading", true);
      commit("setError", {});
      try {
        if (
          !state.blocks[block] ||
          (state.blocks[block] &&
            get(state, `blocks[${block}].block.header['chain_id']`) !== network)
        ) {
          const { getBlock } = apiClient;
          let result = await getBlock(network, block);
          commit("updateBlock", {
            blockHeight: block,
            result
          });
        }

        commit("setBlockLoaded", true);
        commit("setBlockLoading", false);
      } catch (error) {
        commit("setError", error);
        commit("setBlockLoading", false);
        commit("setBlockLoaded", true);
      }
    },
    setBlockLoadedFalse({ commit }) {
      commit("setBlockLoaded", false);
    }
  };

  const mutations = {
    updateBlock(state, { blockHeight, result }) {
      const newBlock = {};
      newBlock.block_meta = result.data.block_meta;
      newBlock.block = result.data.block;
      state.blocks = { ...state.blocks, [blockHeight]: newBlock };
    },
    setBlockLoaded(state, flag) {
      state.loaded = flag;
    },
    setBlockLoading(state, flag) {
      state.loading = flag;
    },
    setError(state, error) {
      state.error = error;
    }
  };

  return {
    state,
    actions,
    mutations
  };
};
