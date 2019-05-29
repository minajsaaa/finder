import axios from "axios";
import { getNetwork } from "../networks";

const limit = 100;

const requestTxs = async (baseUrl, requester) => {
  let res;
  let page = 1;
  let result = [];
  let url = `${baseUrl}${page}`;
  res = await requester.get(url);
  result.push(...res.data);

  while (res.data.length === limit) {
    page += 1;
    url = `${baseUrl}${page}`;
    res = await requester.get(url);
    result.push(...res.data);
  }

  return result;
};
function lcdUrl(network) {
  return getNetwork(network).lcd;
}

const instance = axios.create({
  timeout: 15000
});

const getBlock = (network, blockHeight, requester = instance) => {
  let url = `${lcdUrl(network)}/blocks/${blockHeight}`;
  return requester.get(url);
};

const getTx = (network, hash, requester = instance) => {
  let url = `${lcdUrl(network)}/txs/${hash.toUpperCase()}`;
  return requester.get(url);
};

const getAccount = (network, address, requester = instance) => {
  let url = `${lcdUrl(network)}/auth/accounts/${address}`;
  return requester.get(url);
};

const getDelegations = (network, address, requester = instance) => {
  let url = `${lcdUrl(network)}/staking/delegators/${address}/delegations`;
  return requester.get(url);
};

const getRewards = (
  network,
  delegatorAddress,
  validatorAddress,
  requester = instance
) => {
  let url = `${lcdUrl(
    network
  )}/distribution/delegators/${delegatorAddress}/rewards/${validatorAddress}`;
  return requester.get(url);
};

const getUndelegations = (network, address, requester = instance) => {
  let url = `${lcdUrl(
    network
  )}/staking/delegators/${address}/unbonding_delegations`;
  return requester.get(url);
};

const getSenderTxs = (network, address, requester = instance) => {
  const baseUrl = `${lcdUrl(
    network
  )}/txs?sender=${address}&limit=${limit}&page=`;

  return requestTxs(baseUrl, requester);
};
const getRecipientTxs = async (network, address, requester = instance) => {
  const baseUrl = `${lcdUrl(
    network
  )}/txs?recipient=${address}&limit=${limit}&page=`;

  return requestTxs(baseUrl, requester);
};
const getSwapTxs = (network, address, requester = instance) => {
  const baseUrl = `${lcdUrl(
    network
  )}/txs?action=swap&trader=${address}&limit=${limit}&page=`;

  return requestTxs(baseUrl, requester);
};
const getProposerTxs = (network, address, requester = instance) => {
  const baseUrl = `${lcdUrl(
    network
  )}/txs?action=submit_proposal&proposer=${address}&limit=${limit}&page=`;

  return requestTxs(baseUrl, requester);
};
const getDepositorTxs = (network, address, requester = instance) => {
  const baseUrl = `${lcdUrl(
    network
  )}/txs?action=deposit&depositor=${address}&limit=${limit}&page=`;

  return requestTxs(baseUrl, requester);
};
const getDelegatorsTxs = (network, address, requester = instance) => {
  const baseUrl = `${lcdUrl(
    network
  )}/staking/delegators/${address}/txs?limit=${limit}&page=`;

  return requestTxs(baseUrl, requester);
};

export default {
  getBlock,
  getTx,
  getAccount,
  getDelegations,
  getRewards,
  getUndelegations,
  getSenderTxs,
  getRecipientTxs,
  getSwapTxs,
  getProposerTxs,
  getDepositorTxs,
  getDelegatorsTxs
};
