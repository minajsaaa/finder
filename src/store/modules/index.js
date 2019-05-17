import apiClient from "../apiClient";

const files = require.context(".", false, /\.js$/);
let modules = {};

files.keys().forEach(key => {
  if (key === "./index.js") return;
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default(apiClient);
});

export default modules;
