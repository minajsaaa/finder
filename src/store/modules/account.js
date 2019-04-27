import axios from "../axios";
import * as Promise from "bluebird";
import { getNetwork } from "../../networks";

const state = {
  accounts: {},
  loading: false,
  loaded: false,
  error: {}
};

const actions = {
  async fetchAccount({ commit, dispatch, rootState }, { network, address }) {
    commit("setAccountLoading", true);
    commit("setError", {});
    try {
      const { lcd } = getNetwork(network);
      let newAccount = {};
      let url = `${lcd}/auth/accounts/${address}`;
      let json = await axios.get(url);

      newAccount = json.data.value;
      newAccount.type = json.data.type;

      url = `${lcd}/staking/delegators/${address}/delegations`;
      json = await axios.get(url);

      const delegations = json.data;

      if (delegations)
        Promise.map(delegations, async delegation => {
          const res = await axios.get(
            `${lcd}/distribution/delegators/${
              delegation.delegator_address
            }/rewards/${delegation.validator_address}`
          );
          delegation.rewards = res.data;
        });

      newAccount.delegations = delegations;

      const txs = await Promise.all([
        axios.get(`${lcd}/txs?sender=${address}&limit=100`),
        axios.get(`${lcd}/txs?recipient=${address}&limit=100`),
        axios.get(`${lcd}/txs?action=swap&trader=${address}&limit=100`),
        axios.get(
          `${lcd}/txs?action=submit_proposal&proposer=${address}&limit=100`
        ),
        axios.get(`${lcd}/txs?action=deposit&depositor=${address}&limit=100`),
        axios.get(`${lcd}/staking/delegators/${address}/txs?limit=100`)
      ]).then(
        async ([
          senderTxs,
          recipientTxs,
          swapTxs,
          submitTxs,
          depositTxs,
          txs
        ]) =>
          await [].concat(
            senderTxs.data,
            recipientTxs.data,
            swapTxs.data,
            submitTxs.data,
            depositTxs.data,
            txs.data
          )
      );

      newAccount.txs = txs;

      const len = txs.length || 0;
      const promiseArr = [];

      for (let i = 0; i < len; i++) {
        if (!rootState.block.blocks[txs[i].height]) {
          await promiseArr.push(
            dispatch("fetchBlock", { network, block: txs[i].height })
          );
        }
      }

      await Promise.all(promiseArr);

      await commit("updateAccount", {
        address,
        newAccount
      });

      await commit("setAccountLoaded", true);
      await commit("setAccountLoading", false);
    } catch (error) {
      commit("setError", error);
      commit("setAccountLoading", false);
      commit("setAccountLoaded", true);
    }
  }
};

const mutations = {
  updateAccount(state, { address, newAccount }) {
    state.accounts = { ...state.accounts, [address]: newAccount };
  },
  setAccountLoaded(state, flag) {
    state.loaded = flag;
  },
  setAccountLoading(state, flag) {
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
