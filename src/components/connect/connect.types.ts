import { HashConnectTypes } from 'hashconnect';

export interface IHashconnectData {
  topic: string,
  pairingString: string,
  privKey: string,
  metadata: HashConnectTypes.WalletMetadata,
  accountIds: string[],
}
