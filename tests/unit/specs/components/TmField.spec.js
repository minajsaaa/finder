import { mount } from "@vue/test-utils";
import TmField from "@/components/TmField";
describe(`TmField`, () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TmField);
  });

  it(`TmField Snapshot`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
