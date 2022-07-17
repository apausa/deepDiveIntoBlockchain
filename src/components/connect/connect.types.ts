import { HashConnectTypes } from 'hashconnect';

export interface IData {
  topic: string,
  pairingString: string,
  privKey: string,
  metadata: HashConnectTypes.WalletMetadata,
  accountIds: string[],
}

export interface IFirstTimeData {
  topic: string,
  pairingString: string,
  privKey: string,
}
