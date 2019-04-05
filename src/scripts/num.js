import  numeral from "numeral";

export function full(num) {
  return numeral(num).format(`0,0.0000000000`)
}
export function shortNumber(num) {
  return numeral(num).format(`0,0.0000`) + ``
}