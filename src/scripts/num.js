import numeral from "numeral";
import BigNumber from "bignumber.js";

export function full(num) {
  return numeral(num).format(`0,0.0000000000`);
}
export function shortNumber(num) {
  return numeral(num).format(`0,0.0000`) + ``;
}

export function mlunaToLuna(num) {
  return BigNumber(num)
    .dividedBy(Math.pow(10, 6))
    .decimalPlaces(6)
    .toString();
}

export function denomSlicer(str) {
  const converter = {
    mluna: "Luna",
    mkrw: "KRT",
    musd: "UST",
    msdr: "SDT",
    mgbp: "GBT",
    meur: "EUT",
    mjpy: "JPT",
    mcny: "CNT"
  };
  return converter[str];
}
