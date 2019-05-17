export default {
  data: {
    type: "core/GradedVestingAccount",
    value: {
      BaseVestingAccount: {
        BaseAccount: {
          address: "terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6",
          coins: [
            { denom: "uluna", amount: "699861779862000" },
            { denom: "usdr", amount: "999916136980000" }
          ],
          public_key: {
            type: "tendermint/PubKeyMultisigThreshold",
            value: {
              threshold: "2",
              pubkeys: [
                {
                  type: "tendermint/PubKeySecp256k1",
                  value: "AyETa9Y9ihObzeRPWMP0MBAa0Mqune3I+5KonOCPTtkv"
                },
                {
                  type: "tendermint/PubKeySecp256k1",
                  value: "AzzLltyI4MzxLpcmS1vfpXJeAk/sgS1eVYmvXgFpGRtg"
                },
                {
                  type: "tendermint/PubKeySecp256k1",
                  value: "AnZjvWmye3JPEL95xRcGeFRf4o8pHDK0dkZjf6B9D4FA"
                }
              ]
            }
          },
          account_number: "123",
          sequence: "47"
        },
        original_vesting: [{ denom: "usdr", amount: "1000000000000000" }],
        delegated_free: [{ denom: "uluna", amount: "108200000000000" }],
        delegated_vesting: null,
        end_time: "0"
      },
      vesting_schedules: [
        {
          denom: "usdr",
          schedules: [
            { cliff: "1556085600", ratio: "0.100000000000000000" },
            { cliff: "1587708000", ratio: "0.100000000000000000" },
            { cliff: "1619244000", ratio: "0.100000000000000000" },
            { cliff: "1650780000", ratio: "0.100000000000000000" },
            { cliff: "1682316000", ratio: "0.100000000000000000" },
            { cliff: "1713938400", ratio: "0.100000000000000000" },
            { cliff: "1745474400", ratio: "0.100000000000000000" },
            { cliff: "1777010400", ratio: "0.100000000000000000" },
            { cliff: "1808546400", ratio: "0.100000000000000000" },
            { cliff: "1840168800", ratio: "0.100000000000000000" }
          ]
        }
      ]
    }
  }
};
