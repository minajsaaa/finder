const networks = [
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

export const getNetwork = network =>
  networks.find(({ value }) => value === network) || {};

export default networks;
