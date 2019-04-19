import store from "store";

const networksConfig = [
  {
    value: `soju-0007`,
    key: `Soju-0007`,
    lcd: `https://lcd.terra.money`,
    rpc: `http://101.101.167.127:26657`,
    wss: `ws://101.101.167.127:26657/websocket`
  },
  {
    value: `vodka`,
    key: `Vodka Testnet`,
    lcd: `https://vodka-lcd.terra.money`,
    rpc: `https://vodka-rpc.terra.money`,
    wss: `wss://vodka.terra.money:26657/websocket`
  },
  {
    value: `columbus-drill`,
    key: `Columbus Drill`,
    lcd: `https://drill-lcd.terra.money`,
    rpc: `https://drill-rpc.terra.money`,
    wss: `wss://drill.terra.money:26657/websocket`
  }
];

const state = {
  activeMenu: "",
  blockchainSelect: false,
  desktop: false,
  localDev: process.env.VUE_APP_LOCAL_DEV !== undefined,
  rpc: networksConfig[0].rpc,
  lcd: networksConfig[0].lcd,
  wss: networksConfig[0].wss,
  networks: networksConfig
};

const actions = {
  async getNetworkConfig({ state, dispatch }) {
    if (!store.get("network")) {
      store.set("network", state.networks[0].value);
    }
    await dispatch(`setNetworkConfig`, store.get("network"));
    return store.get("network");
  },
  setNetworkConfig({ state, commit }, networkName) {
    state.networks.map(n => {
      if (networkName == n.value) {
        commit("SET_LCD", n.lcd);
        commit("SET_RPC", n.rpc);
        commit("SET_WSS", n.wss);
      }
    });
    store.set("network", networkName);
  }
};

const mutations = {
  SET_CONFIG_BLOCKCHAIN_SELECT(state, value) {
    state.blockchainSelect = value;
  },
  setActiveMenu(state, value) {
    state.activeMenu = value;
  },
  SET_CONFIG_DESKTOP(state, value) {
    state.desktop = value;
  },
  SET_LCD(state, value) {
    state.lcd = value;
  },
  SET_RPC(state, value) {
    state.rpc = value;
  },
  SET_WSS(state, value) {
    state.wss = value;
  }
};

export default {
  state,
  actions,
  mutations
};
