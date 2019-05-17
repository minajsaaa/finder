import { shortRatio, rebaseAsset, denomSlicer } from "@/scripts/num";

describe(`script num`, () => {
  it(`should shortRatio function handle "0.100000000000000000"`, () => {
    expect(shortRatio(0)).toEqual(`0.00`);
    expect(shortRatio(NaN)).toEqual(`0.00`);
    expect(shortRatio(undefined)).toEqual(`0.00`);
    expect(shortRatio(null)).toEqual(`0.00`);
    expect(shortRatio(`0.100000000000000000`)).toEqual(`10.00`);
    expect(shortRatio(`0.000000000000000001`)).toEqual(`0.00`);
  });
  it(`should rebaseAsset function handle zero`, () => {
    expect(rebaseAsset(0)).toEqual(`0.000000`);
    expect(rebaseAsset(undefined)).toEqual(`0.000000`);
    expect(rebaseAsset(NaN)).toEqual(`0.000000`);
    expect(rebaseAsset(null)).toEqual(`0.000000`);
    expect(rebaseAsset(`0.100000000000000000`)).toEqual(`0.000000`);
    expect(rebaseAsset(`0.000000000000000001`)).toEqual(`0.000000`);
    expect(rebaseAsset(`1000000000000000`)).toEqual(`1000000000.000000`);
  });

  it(`should denomSlicer function work`, () => {
    expect(denomSlicer(null)).toEqual(`ERROR`);
    expect(denomSlicer(undefined)).toEqual(`ERROR`);
    expect(denomSlicer(`uluna`)).toEqual(`LUNA`);
    expect(denomSlicer(`ukrw`)).toEqual(`KRT`);
    expect(denomSlicer(`usdr`)).toEqual(`SDT`);
    expect(denomSlicer(`uusd`)).toEqual(`UST`);
    expect(denomSlicer(`ugbp`)).toEqual(`GBT`);
    expect(denomSlicer(`ueur`)).toEqual(`EUT`);
    expect(denomSlicer(`ujpy`)).toEqual(`JPT`);
    expect(denomSlicer(`ucny`)).toEqual(`CNT`);
  });
});
