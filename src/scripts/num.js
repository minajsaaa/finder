import numeral from "numeral";
import BigNumber from "bignumber.js";

export function full(num) {
  return numeral(num).format(`0,0.0000000000`);
}
export function shortNumber(num) {
  return numeral(num).format(`0,0.0000`) + ``;
}

export function rebaseAsset(num) {
  return BigNumber(num)
    .dividedBy(Math.pow(10, 6))
    .decimalPlaces(6)
    .toFixed(6);
}

export function denomSlicer(str) {
  var frag = str.slice(1);
  if (frag == "luna") {
    return "LUNA";
  }
  return frag.slice(0, 2).toUpperCase() + "T";
}
