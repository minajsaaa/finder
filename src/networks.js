const networks = [
  {
    value: 'columbus-1',
    key: 'Columbus-1',
    lcd: 'https://lcd.terra.dev',
    rpc: 'https://rpc.terra.dev',
    wss: 'ws://rpc.terra.dev/websocket'
  },
  {
    value: 'soju-0008',
    key: 'Soju-0008',
    lcd: 'https://soju-0008-lcd.terra.dev',
    rpc: 'https://soju-0008-rpc.terra.dev',
    wss: 'ws://soju-0008-rpc.terra.dev/websocket'
  },
  {
    value: 'vodka',
    key: 'Vodka Testnet',
    lcd: 'https://vodka-lcd.terra.money',
    rpc: 'https://vodka-rpc.terra.money',
    wss: 'wss://vodka.terra.money:26657/websocket'
  },
  {
    value: 'columbus-drill-2',
    key: 'Columbus Drill 2',
    lcd: 'https://drill-2-lcd.terra.money',
    rpc: 'https://drill-2-rpc.terra.money',
    wss: 'wss://drill.terra.money:26657/websocket'
  }
];

export const getNetwork = network =>
  networks.find(({ value }) => value === network) || {};

export default networks;
