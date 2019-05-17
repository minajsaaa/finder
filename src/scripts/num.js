import BigNumber from "bignumber.js";

export function shortRatio(num) {
  return BigNumber(num || 0)
    .times(100)
    .decimalPlaces(2)
    .toFixed(2);
}

export function rebaseAsset(num) {
  return BigNumber(num || 0)
    .dividedBy(Math.pow(10, 6))
    .decimalPlaces(6)
    .toFixed(6);
}

export function denomSlicer(str) {
  if (!str) {
    return `ERROR`;
  }
  var frag = String(str).slice(1);
  if (frag == "luna") {
    return "LUNA";
  }
  return frag.slice(0, 2).toUpperCase() + "T";
}
