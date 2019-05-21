import { mount } from "@vue/test-utils";
import AppPage from "@/components/AppPage";
describe(`AppPage`, () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(AppPage);
  });

  it(`AppPage Snapshot`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
