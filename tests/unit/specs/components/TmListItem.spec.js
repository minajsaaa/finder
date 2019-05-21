import { mount } from "@vue/test-utils";
import TmListItem from "@/components/TmListItem";

describe(`TmListItem`, () => {
  let wrapper, localThis;
  beforeEach(() => {
    wrapper = mount(TmListItem);
  });

  it(`TmListItem Snapshot`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  describe(`Computed`, () => {
    beforeEach(() => {
      localThis = {
        spin: true
      };
    });

    it(`TmListItem`, () => {
      expect(TmListItem.computed.spinClass.call(localThis)).toBe("fa-spin");
    });

    it(`TmListItem`, () => {
      expect(TmListItem.computed.spinClass()).toBe(null);
    });
  });
});
