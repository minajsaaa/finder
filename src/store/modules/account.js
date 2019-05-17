import * as Promise from "bluebird";

export default apiClient => {
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
        let newAccount = {};

        let result = await apiClient.getAccount(network, address);

        newAccount = result.data && result.data.value;

        if (!newAccount) {
          await commit("setAccountLoaded", true);
          return commit("setAccountLoading", false);
        }
        newAccount.type = result.data.type;

        result = await apiClient.getDelegations(network, address);

        const delegations = result.data;

        if (delegations)
          Promise.map(delegations, async delegation => {
            const res = await apiClient.getRewards(
              network,
              delegation.delegator_address,
              delegation.validator_address
            );
            delegation.rewards = res.data;
          });

        newAccount.delegations = delegations;

        result = await apiClient.getUndelegations(network, address);

        const unbondings_data = result.data;

        const unbondingDelegations = [];
        if (unbondings_data) {
          unbondings_data.map(validator => {
            const validatorAddress = validator.validator_address;
            if (validator.entries) {
              validator.entries.map(entry => {
                const item = {
                  validatorAddress,
                  creationHeight: entry.creation_height,
                  completionTime: entry.completion_time,
                  balance: entry.balance
                };

                unbondingDelegations.push(item);
              });
            }
          });
        }
        newAccount.unbondingDelegations = unbondingDelegations;

        const txs = await Promise.all([
          apiClient.getSenderTxs(network, address),
          apiClient.getRecipientTxs(network, address),
          apiClient.getSwapTxs(network, address),
          apiClient.getProposerTxs(network, address),
          apiClient.getDepositorTxs(network, address),
          apiClient.getDelegatorsTxs(network, address)
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

  return {
    state,
    actions,
    mutations
  };
};
