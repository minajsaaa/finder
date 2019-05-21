import tx from "@/store/modules/tx";
import networks from "@/networks";
import result from "../json/tx";
import blockResult from "../json/block";
import mockState from "../mockState";

describe(`Module: tx`, () => {
  let state, actions, mutations, apiClient, txModule;
  const hash = `B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2`;
  beforeEach(() => {
    apiClient = {
      getTx: jest.fn().mockResolvedValue(result)
    };
    txModule = tx(apiClient);
    state = txModule.state;
    actions = txModule.actions;
    mutations = txModule.mutations;
  });

  it(`mutation: setTxsLoading`, () => {
    const { setTxsLoading } = mutations;

    setTxsLoading(state, true);
    expect(state.txsLoading).toEqual(true);
    setTxsLoading(state, false);
    expect(state.txsLoading).toEqual(false);
  });

  it(`mutation: setTxsLoaded`, () => {
    const { setTxsLoaded } = mutations;

    setTxsLoaded(state, true);
    expect(state.txsLoaded).toEqual(true);
    setTxsLoaded(state, false);
    expect(state.txsLoaded).toEqual(false);
  });

  it(`mutation: setTxLoading`, () => {
    const { setTxLoading } = mutations;

    setTxLoading(state, true);
    expect(state.txLoading).toEqual(true);
    setTxLoading(state, false);
    expect(state.txLoading).toEqual(false);
  });

  it(`mutation: setTxLoaded`, () => {
    const { setTxLoaded } = mutations;

    setTxLoaded(state, true);
    expect(state.txLoaded).toEqual(true);
    setTxLoaded(state, false);
    expect(state.txLoaded).toEqual(false);
  });

  it(`mutation: setError`, () => {
    const { setError } = mutations;
    const error = new Error(`err`);

    setError(state, error);
    expect(state.error).toEqual(error);
  });

  it(`mutation: updateTx`, () => {
    const { updateTx } = mutations;
    updateTx(state, result.data);
    expect(state.txs[hash]).toEqual(result.data);
  });

  it(`action: queryTx`, async () => {
    const result = { data: { txhash: hash } };
    apiClient = {
      getTx: jest.fn().mockResolvedValue(result)
    };

    txModule = tx(apiClient);
    actions = txModule.actions;

    const { queryTx } = actions;
    const commit = jest.fn();
    await queryTx({ commit }, { network: networks[0].value, hash });
    expect(commit).toHaveBeenCalledWith("setTxLoading", true);
    expect(commit).toHaveBeenCalledWith("setError", {});
    expect(commit).toHaveBeenCalledWith("updateTx", result.data);
    expect(commit).toHaveBeenCalledWith("setTxLoaded", true);
    expect(commit).toHaveBeenCalledWith("setTxLoading", false);
  });

  it(`action: queryTx error`, async () => {
    const error = new Error(`error`);
    apiClient = {
      getTx: jest.fn().mockRejectedValue(error)
    };

    txModule = tx(apiClient);
    actions = txModule.actions;

    const { queryTx } = actions;
    const commit = jest.fn();
    await queryTx({ commit }, { network: networks[0].value, hash });
    expect(commit).toHaveBeenCalledWith("setTxLoading", true);
    expect(commit).toHaveBeenCalledWith("setError", {});
    expect(commit).toBeCalledTimes(5);
    expect(commit).toHaveBeenCalledWith("setError", error);
    expect(commit).toHaveBeenCalledWith("setTxLoaded", true);
    expect(commit).toHaveBeenCalledWith("setTxLoading", false);
  });

  it(`action: queryTxs`, async () => {
    const block = blockResult.data.block;
    const params = { network: networks[0].value };
    const { queryTxs } = actions;
    const commit = jest.fn();
    const dispatch = jest.fn();
    const rootState = mockState;
    await queryTxs({ commit, dispatch, rootState }, [block, params]);
    expect(commit).toHaveBeenCalledWith("setTxsLoading", true);
    expect(commit).toHaveBeenCalledWith("setError", {});
    expect(commit).toHaveBeenCalledWith("setTxsLoading", false);
    expect(commit).toHaveBeenCalledWith("setTxsLoaded", true);
  });

  it(`action: queryTxs error`, async () => {
    const block = blockResult.data.block;
    const params = { network: networks[0].value };
    const { queryTxs } = actions;
    const commit = jest.fn();
    const dispatch = jest.fn();
    const rootState = undefined;
    await queryTxs({ commit, dispatch, rootState }, [block, params]);
    expect(commit).toHaveBeenCalledWith("setTxsLoading", true);
    expect(commit).toHaveBeenCalledWith("setError", {});
    expect(commit).toHaveBeenCalledWith("setTxsLoading", false);
    expect(commit).toHaveBeenCalledWith("setTxsLoaded", true);
  });
});
