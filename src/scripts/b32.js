import * as bech32 from "bech32";

export function decode(value) {
  let words = bech32.decode(value.toLowerCase());
  return Buffer.from(bech32.fromWords(words.words)).toString(`hex`);
}

export function encode(value, prefix = `terra`, type = `hex`) {
  let words = bech32.toWords(Buffer.from(value, type));
  return bech32.encode(prefix, words);
}
