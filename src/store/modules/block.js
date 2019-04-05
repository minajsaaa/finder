import axios from "../axios"
import { state as configState } from "./config"
const state = {
  blocks: {},
  loading: false,
  loaded: false,
  error: {}
}

const actions = {
  async fetchBlock({ commit }, blockHeight) {
    commit("setBlockLoaded", true)
    commit("setError", {})
    try {
      let url = `${configState.lcd}/blocks/${blockHeight}`
      let json = await axios.get(url)
      commit("updateBlock", {
        blockHeight,
        json
      })

      commit("setBlockLoaded", true)
      commit("setBlockLoading", false)
    } catch (error) {
      commit("setError", error)
      commit("setBlockLoading", false)
    }

  },
  setBlockLoadedFalse({ commit }) {
    commit("setBlockLoaded", false)
  }
}

const mutations = {
  updateBlock(state, { blockHeight, json }) {
    const newBlock = {}
    newBlock.block_meta = json.data.block_meta
    newBlock.block = json.data.block
    state.blocks = { ...state.blocks, [blockHeight]: newBlock }
  },
  setBlockLoaded(state, flag) {
    state.loaded = flag
  },
  setBlockLoading(state, flag) {
    state.loading = flag
  },
  setError(state, error) {
    state.error = error
  }
}

export default {
  state,
  actions,
  mutations
}
