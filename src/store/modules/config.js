export const state = {
  activeMenu: "",
  blockchainSelect: false,
  desktop: false,
  localDev: process.env.VUE_APP_LOCAL_DEV !== undefined,
  rpc:
    process.env.LCD_URL !== undefined
      ? "http://soju.terra.money:36657"
      : process.env.LCD_URL,
  lcd: "https://lcd.terra.money",
  wss:
    process.env.RPC_URL !== undefined
      ? "wss://13.125.232.86:36657"
      : process.env.RPC_URL
};

const mutations = {
  SET_CONFIG_BLOCKCHAIN_SELECT(state, value) {
    state.blockchainSelect = value
  },
  setActiveMenu(state, value) {
    state.activeMenu = value
  },
  SET_CONFIG_DESKTOP(state, value) {
    state.desktop = value
  }
}

export default {
  state,
  mutations
}
