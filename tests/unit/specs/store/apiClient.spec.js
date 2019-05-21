import apiClient from "@/store/apiClient";
import networks from "@/networks.js";

describe(`apiClient Test`, () => {
  let network;
  const instance = {
    get: jest.fn()
  };
  const blockHeight = 42;
  const hash = `B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2`;
  const address = `terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6`;
  const validatorAddress = `terravaloper1p54hc4yy2ajg67j645dn73w3378j6k05vmx9r9`;
  describe(`columbus-1 test`, () => {
    it(`Test apis with columbus 1`, () => {
      network = networks[0].value;

      apiClient.getBlock(network, blockHeight, instance);
      expect(instance.get.mock.calls[0][0]).toEqual(
        `https://lcd.terra.dev/blocks/42`
      );
      apiClient.getTx(network, hash, instance);
      expect(instance.get.mock.calls[1][0]).toEqual(
        `https://lcd.terra.dev/txs/B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2`
      );
      apiClient.getAccount(network, address, instance);
      expect(instance.get.mock.calls[2][0]).toEqual(
        `https://lcd.terra.dev/auth/accounts/terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6`
      );
      apiClient.getDelegations(network, address, instance);
      expect(instance.get.mock.calls[3][0]).toEqual(
        `https://lcd.terra.dev/staking/delegators/terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6/delegations`
      );
      apiClient.getRewards(network, address, validatorAddress, instance);
      expect(instance.get.mock.calls[4][0]).toEqual(
        `https://lcd.terra.dev/distribution/delegators/terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6/rewards/terravaloper1p54hc4yy2ajg67j645dn73w3378j6k05vmx9r9`
      );
      apiClient.getUndelegations(network, address, instance);
      expect(instance.get.mock.calls[5][0]).toEqual(
        `https://lcd.terra.dev/staking/delegators/terra1dp0taj85ruc299rkdvzp4z5pfg6z6swaed74e6/unbonding_delegations`
      );
      apiClient.getSenderTxs(network, hash, instance);
      expect(instance.get.mock.calls[6][0]).toEqual(
        `https://lcd.terra.dev/txs?sender=B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2&limit=1000`
      );
      apiClient.getRecipientTxs(network, hash, instance);
      expect(instance.get.mock.calls[7][0]).toEqual(
        `https://lcd.terra.dev/txs?recipient=B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2&limit=1000`
      );
      apiClient.getSwapTxs(network, hash, instance);
      expect(instance.get.mock.calls[8][0]).toEqual(
        `https://lcd.terra.dev/txs?action=swap&trader=B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2&limit=1000`
      );
      apiClient.getProposerTxs(network, hash, instance);
      expect(instance.get.mock.calls[9][0]).toEqual(
        `https://lcd.terra.dev/txs?action=submit_proposal&proposer=B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2&limit=1000`
      );
      apiClient.getDepositorTxs(network, hash, instance);
      expect(instance.get.mock.calls[10][0]).toEqual(
        `https://lcd.terra.dev/txs?action=deposit&depositor=B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2&limit=1000`
      );
      apiClient.getDelegatorsTxs(network, hash, instance);
      expect(instance.get.mock.calls[11][0]).toEqual(
        `https://lcd.terra.dev/staking/delegators/B463C2868822FD5ABCAAF67FC579691E7060B83139E94CA589E0F56FA10F04D2/txs?limit=1000`
      );
    });
  });
});
