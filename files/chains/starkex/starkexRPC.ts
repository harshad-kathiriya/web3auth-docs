// @ts-ignore
// HIGHLIGHTSTART-installationStarkEx
import StarkExAPI from "@starkware-industries/starkex-js/dist/browser";
// HIGHLIGHTEND-installationStarkEx
// @ts-ignore
// HIGHLIGHTSTART-installationStarkEx
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
// HIGHLIGHTEND-installationStarkEx
import type { SafeEventEmitterProvider } from "@web3auth/base";
// @ts-ignore
// HIGHLIGHTSTART-installationStarkEx
import { ec as elliptic } from "elliptic";
// HIGHLIGHTEND-installationStarkEx

const starkExAPI = new StarkExAPI({
  endpoint: "https://gw.playground-v2.starkex.co",
});

export default class StarkExRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  getStarkAccount = async (): Promise<any> => {
    try {
      // HIGHLIGHTSTART-starkExRPCFunctions
      const privateKey = await this.provider.request({ method: "private_key" });
      const keyPair = starkwareCrypto.ec.keyFromPrivate(privateKey, "hex");
      const account = starkwareCrypto.ec.keyFromPublic(keyPair.getPublic(true, "hex"), "hex");
      // HIGHLIGHTEND-starkExRPCFunctions
      return account;
    } catch (error) {
      return error;
    }
  };

  getStarkKey = async (): Promise<string | undefined> => {
    try {
      // HIGHLIGHTSTART-starkExRPCFunctions
      const account = await this.getStarkAccount();
      const publicKeyX = account.pub.getX().toString("hex");
      // HIGHLIGHTEND-starkExRPCFunctions
      return publicKeyX;
    } catch (error) {
      return error as string;
    }
  };

  onMintRequest = async (): Promise<any> => {
    try {
      // HIGHLIGHTSTART-starkExRPCFunctions
      const txId = await starkExAPI.gateway.getFirstUnusedTxId();
      const starkKey = await this.getStarkKey();

      const request = {
        txId,
        vaultId: 1654615998,
        amount: "6",
        tokenId: "0x400de4b5a92118719c78df48f4ff31e78de58575487ce1eaf19922ad9b8a714",
        starkKey: `0x${starkKey}`,
      };
      const response = await starkExAPI.gateway.mint(request);
      // HIGHLIGHTEND-starkExRPCFunctions
      return response;
    } catch (error) {
      return error as string;
    }
  };

  onDepositRequest = async () => {
    try {
      // HIGHLIGHTSTART-starkExRPCFunctions
      const txId = await starkExAPI.gateway.getFirstUnusedTxId();
      const starkKey = await this.getStarkKey();
      const request = {
        txId,
        amount: 8,
        starkKey: `0x${starkKey}`,
        tokenId: "0x3ef811e040c4bc9f9eee715441cee470f5d5aff69b9cd9aca7884f5a442a890",
        vaultId: 1924014660,
      };
      const response = await starkExAPI.gateway.deposit(request);
      // HIGHLIGHTEND-starkExRPCFunctions
      return response;
    } catch (error) {
      return error as string;
    }
  };

  onWithdrawalRequest = async (): Promise<any> => {
    try {
      // HIGHLIGHTSTART-starkExRPCFunctions
      const txId = await starkExAPI.gateway.getFirstUnusedTxId();
      const starkKey = await this.getStarkKey();
      const request = {
        txId,
        amount: 8,
        starkKey: `0x${starkKey}`,
        tokenId: "0x2dd48fd7a024204f7c1bd874da5e709d4713d60c8a70639eb1167b367a9c378",
        vaultId: 612008755,
      };
      const response = await starkExAPI.gateway.withdrawal(request);
      // HIGHLIGHTEND-starkExRPCFunctions
      return response;
    } catch (error) {
      return error as string;
    }
  };
}
