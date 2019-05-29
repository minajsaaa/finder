import block from "@/store/modules/block";
import networks from "@/networks";
import result from "../json/block";

describe(`Module: block`, () => {
  let state, actions, mutations;

  beforeEach(() => {
    const apiClient = {
      getBlock: jest.fn()
    };
    const blockModule = block(apiClient);
    state = blockModule.state;
    actions = blockModule.actions;
    mutations = blockModule.mutations;
  });

  it(`mutation: setBlockLoaded`, async () => {
    const { setBlockLoaded } = mutations;

    setBlockLoaded(state, true);
    expect(state.loaded).toEqual(true);
    setBlockLoaded(state, false);
    expect(state.loaded).toEqual(false);
  });

  it(`mutation: setBlockLoading`, async () => {
    const { setBlockLoading } = mutations;

    setBlockLoading(state, true);
    expect(state.loading).toEqual(true);
    setBlockLoading(state, false);
    expect(state.loading).toEqual(false);
  });

  it(`mutation: setError`, async () => {
    const { setError } = mutations;
    const error = new Error(`err`);

    setError(state, error);
    expect(state.error).toEqual(error);
  });

  it(`mutation: updateBlock`, async () => {
    const { updateBlock } = mutations;
    updateBlock(state, {
      blockHeight: 606,
      result
    });
    expect(state.blocks[606]).toEqual(result.data);
  });

  it(`action: fetchBlock`, async () => {
    const { fetchBlock } = actions;
    const commit = jest.fn();
    await fetchBlock({ commit }, { network: networks[0].value, block: `42` });
    expect(commit).toHaveBeenCalledWith("setBlockLoading", true);
    expect(commit).toHaveBeenCalledWith("setError", {});
    expect(commit).toHaveBeenCalledWith("setBlockLoaded", true);
    expect(commit).toHaveBeenCalledWith("setBlockLoading", false);
  });

  it(`action: fetchBlock error`, async () => {
    const error = new Error(`err`);
    const apiClient = {
      getBlock: jest.fn().mockRejectedValue(error)
    };
    const blockModule = block(apiClient);
    actions = blockModule.actions;

    const { fetchBlock } = actions;
    const commit = jest.fn();
    const state = {
      blocks: {},
      loading: false,
      loaded: false,
      error: {}
    };
    await fetchBlock(
      { state, commit },
      { network: networks[0].value, block: `42` }
    );
    expect(commit).toHaveBeenCalledWith("setBlockLoading", true);
    expect(commit).toHaveBeenCalledWith("setError", {});
    expect(commit).toHaveBeenCalledWith("setBlockLoading", false);
    expect(commit).toHaveBeenCalledWith("setError", error);
    expect(commit).toHaveBeenCalledWith("setBlockLoaded", true);
  });

  it(`action: setBlockLoadedFalse`, async () => {
    const { setBlockLoadedFalse } = actions;
    const commit = jest.fn();
    await setBlockLoadedFalse({ commit });
    expect(commit).toHaveBeenCalledWith("setBlockLoaded", false);
  });
});
