import axios from "../axios";
import { getNetwork } from "../../networks";

const state = {
  blocks: {},
  loading: false,
  loaded: false,
  error: {}
};

const actions = {
  async fetchBlock({ commit }, { network, block }) {
    commit("setBlockLoading", true);
    commit("setError", {});
    try {
      let url = `${getNetwork(network).lcd}/blocks/${block}`;
      let json = await axios.get(url);
      commit("updateBlock", {
        blockHeight: block,
        json
      });

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
  updateBlock(state, { blockHeight, json }) {
    const newBlock = {};
    newBlock.block_meta = json.data.block_meta;
    newBlock.block = json.data.block;
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

export default {
  state,
  actions,
  mutations
};
