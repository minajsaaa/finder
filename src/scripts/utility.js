import moment from "moment"
import createHash from "create-hash"
import b64 from "base64-js"

export function format(time) {
  const m = moment(time)
  return m.format(`YYYY.MM.DD hh:mm:ss`)
}

export function txToHash(tx) {
  let txbytes = b64.toByteArray(tx)

  let hash = createHash("sha256")
    .update(Buffer.from(txbytes))
    .digest("hex")

  return hash.toUpperCase()
}

export function fromNow(time) {
  const m = moment(time)
  return m.fromNow()
}

export function handleSearch(keyword) {
  if (Number.isInteger(Number(keyword))) {
    return `/blocks/${keyword}`
  } else if (keyword.indexOf('terra') > -1) {
    return `/account/${keyword}`
  } else {
    return `/tx/${keyword}`
  }
}
