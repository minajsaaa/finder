export default {
  data: {
    height: "719",
    txhash: "B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2",
    data: "0C08C7F3EEE60510BA81D19A02",
    raw_log: '[{"msg_index":"0","success":true,"log":""}]',
    logs: [{ msg_index: "0", success: true, log: "" }],
    gas_wanted: "200000",
    gas_used: "163455",
    tags: [
      { key: "action", value: "begin_redelegate" },
      {
        key: "delegator",
        value: "terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6"
      },
      {
        key: "source-validator",
        value: "terravaloper1d3hatwcsvkktgwp3elglw9glca0h42yg6xy4lp"
      },
      {
        key: "destination-validator",
        value: "terravaloper1rgu3qmm6rllfxlrfk94pgxa0jm37902dynqehm"
      },
      { key: "end-time", value: "2019-05-15T07:03:35Z" }
    ],
    tx: {
      type: "auth/StdTx",
      value: {
        msg: [
          {
            type: "cosmos-sdk/MsgBeginRedelegate",
            value: {
              delegator_address: "terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6",
              validator_src_address:
                "terravaloper1d3hatwcsvkktgwp3elglw9glca0h42yg6xy4lp",
              validator_dst_address:
                "terravaloper1rgu3qmm6rllfxlrfk94pgxa0jm37902dynqehm",
              amount: { denom: "uluna", amount: "10000000000000" }
            }
          }
        ],
        fee: {
          amount: [{ denom: "uluna", amount: "3000" }],
          gas: "200000"
        },
        signatures: [
          {
            pub_key: {
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
            signature:
              "CgUIAxIBoBJAhC9gbjkTPkVdFLptrznnAfTImak2tqqu+UEciOrGhaQvYTMoGrh0IgcNUaxLjDSgk87CA/8Vl3Sky9/HY12PlRJAm+udscVEPHQmUTE6atVkkdqoyJL2xhDs7iAIMI9PMmNrzO8epRupYJ4Hv2mu8dNAhJFQXL38R8pXycRwjDH64g=="
          }
        ],
        memo: ""
      }
    },
    timestamp: "2019-04-24T07:03:35Z"
  }
};
