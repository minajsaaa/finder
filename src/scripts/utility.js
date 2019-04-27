import { filter } from "lodash";
import moment from "moment";
import createHash from "create-hash";
import b64 from "base64-js";

export function format(time) {
  const m = moment.utc(time);
  return m.format(`YYYY.MM.DD HH:mm:ss`);
}

export function fromUnixTime(time) {
  const m = moment.utc(time * 1000);
  return m.format(`YYYY.MM.DD HH:mm:ss`);
}

export function fromISOTime(time) {
  const m = moment.utc(time);
  return m.format(`YYYY.MM.DD HH:mm:ss`);
}

export function txToHash(tx) {
  let txbytes = b64.toByteArray(tx);

  let hash = createHash("sha256")
    .update(Buffer.from(txbytes))
    .digest("hex");

  return hash.toUpperCase();
}

export function fromNow(time) {
  const m = moment(time);
  return m.fromNow();
}

export function handleSearch(keyword, network) {
  if (Number.isInteger(Number(keyword))) {
    return `/${network}/blocks/${keyword}`;
  } else if (keyword.indexOf("terra") > -1) {
    return `/${network}/account/${keyword}`;
  } else {
    return `/${network}/tx/${keyword}`;
  }
}

export function isTerraAddress(keyword) {
  if (keyword.length === 44 && keyword.indexOf("terra") > -1) {
    return true;
  }
  return false;
}

export function findDenomFromArray(array, denom) {
  if (filter(array, { denom }).length === 1) {
    return filter(array, { denom })[0];
  } else {
    return null;
  }
}

export const DENOMS = [`uluna`, `usdr`, `uusd`, `ukrw`];
