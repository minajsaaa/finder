import * as Promise from "bluebird";
import { get } from "lodash";

export default apiClient => {
  const state = {
    accounts: {},
    loading: false,
    loaded: false,
    error: {}
  };

  const actions = {
    async fetchAccount({ commit }, { network, address }) {
      commit("setAccountLoading", true);
      commit("setError", {});
      try {
        if (
          !state.accounts[address] ||
          (state.accounts[address] &&
            get(state, `accounts[${address}].network`) !== network)
        ) {
          let newAccount = {};
          let result = await apiClient.getAccount(network, address);

          newAccount = get(result, `data.value`) || null;

          if (!newAccount) {
            await commit("updateAccount", { address, newAccount });
            await commit("setAccountLoaded", true);
            return commit("setAccountLoading", false);
          }
          newAccount.network = network;
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
                senderTxs,
                recipientTxs,
                swapTxs,
                submitTxs,
                depositTxs,
                txs
              )
          );

          newAccount.txs = txs;

          await commit("updateAccount", {
            address,
            newAccount
          });
        }

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
