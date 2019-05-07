import { startApp } from "@/main";

async function start() {
  const store = {
    state: {},
    commit: jest.fn(),
    dispatch: jest.fn(() => Promise.resolve())
  };
  const Store = () => store;
  const $mount = jest.fn();
  class Vue {
    constructor() {
      this.$mount = $mount;
    }
  }
  Vue.config = {};
  Vue.use = jest.fn();

  await startApp(Store, Vue);

  return { store, Vue };
}
describe(`App Start`, () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
    jest.resetModules();
  });

  it(`Check the calls on VUE`, async () => {
    const { Vue } = await start();

    expect(Vue.use).toHaveBeenCalledTimes(1);
  });
});
