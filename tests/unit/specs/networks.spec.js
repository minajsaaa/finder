import networks, { getNetwork } from "@/networks.js";

describe("networks", () => {
  it(`should getNetwork function work`, () => {
    expect(getNetwork(`columbus-1`)).toEqual(networks[0]);
    expect(getNetwork(`soju-0008`)).toEqual(networks[1]);
    expect(getNetwork(`ricewine-0001`)).toEqual(networks[2]);
    expect(getNetwork(``)).toEqual({});
    expect(getNetwork(undefined)).toEqual({});
    expect(getNetwork(null)).toEqual({});
  });
});
