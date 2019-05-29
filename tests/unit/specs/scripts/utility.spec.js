import { sliceMsgType } from "@/scripts/utility";

describe(`scripts utility`, () => {
  it(`sliceMsgType`, () => {
    expect(sliceMsgType(0)).toEqual(`unknown msg`);
    expect(sliceMsgType(undefined)).toEqual(`unknown msg`);
    expect(sliceMsgType(null)).toEqual(`unknown msg`);
    expect(sliceMsgType(12345)).toEqual(`12345`);
    expect(sliceMsgType({ 12345: 123456 })).toEqual(`unknown msg`);

    expect(sliceMsgType(`cosmos-sdk/MsgSend`)).toEqual(`MsgSend`);
    expect(sliceMsgType(`MsgSend`)).toEqual(`MsgSend`);
  });
});
