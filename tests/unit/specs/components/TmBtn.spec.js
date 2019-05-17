import { mount } from "@vue/test-utils";
import TmBtn from "@/components/TmBtn";

describe(`TmBtn`, () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(TmBtn)
  })

  it(`TmBtn Snapshot`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})