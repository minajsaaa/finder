const networks = [
  {
    value: "columbus-1",
    key: "Columbus-1",
    lcd: "https://lcd.terra.dev",
    rpc: "https://rpc.terra.dev",
    wss: "ws://rpc.terra.dev/websocket"
  },
  {
    value: "soju-0008",
    key: "Soju-0008 Testnet",
    lcd: "https://soju-0008-lcd.terra.dev",
    rpc: "https://soju-0008-rpc.terra.dev",
    wss: "ws://soju-0008-rpc.terra.dev/websocket"
  }
];

export const getNetwork = network =>
  networks.find(({ value }) => value === network) || {};

export default networks;
