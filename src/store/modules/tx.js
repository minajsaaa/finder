import { txToHash } from "../../scripts/utility";

export default apiClient => {
  const state = {
    txs: {},
    txsLoading: false,
    txsLoaded: false,
    txLoading: false,
    txLoaded: false,
    error: {}
  };

  const actions = {
    async queryTxs({ dispatch, commit, rootState }, [block, { network }]) {
      commit("setTxsLoading", true);
      commit("setError", {});
      try {
        const len = block.data.txs.length || 0;
        const promiseArr = [];
        for (let i = 0; i < len; i++) {
          let hash = await txToHash(block.data.txs[i]);
          if (!rootState.tx.txs[hash]) {
            await promiseArr.push(dispatch("queryTx", { network, hash }));
          }
        }
        await Promise.all(promiseArr);

        commit("setTxsLoading", false);
        commit("setTxsLoaded", true);
      } catch (error) {
        commit("setError", error);
        commit("setTxsLoaded", true);
        commit("setTxsLoading", false);
      }
    },
    async queryTx({ commit }, { network, hash }) {
      commit("setTxLoading", true);
      commit("setError", {});
      try {
        const { getTx } = apiClient;
        const result = await getTx(network, hash);
        commit("updateTx", result.data);
        commit("setTxLoaded", true);
        commit("setTxLoading", false);
      } catch (error) {
        commit("setError", error);
        commit("setTxLoaded", true);
        commit("setTxLoading", false);
      }
    }
  };

  const mutations = {
    updateTx(state, data) {
      state.txs = { ...state.txs, [data.txhash]: data };
    },
    setTxsLoading(state, flag) {
      state.txsLoading = flag;
    },
    setTxsLoaded(state, flag) {
      state.txsLoaded = flag;
    },
    setTxLoading(state, flag) {
      state.txLoading = flag;
    },
    setTxLoaded(state, flag) {
      state.txLoaded = flag;
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
