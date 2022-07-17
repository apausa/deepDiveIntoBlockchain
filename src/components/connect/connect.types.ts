import { HashConnectTypes } from 'hashconnect';

export interface IData {
  topic: string,
  pairingString: string,
  privKey: string,
  walletMetadata: HashConnectTypes.WalletMetadata,
  pairedAccounts?: any[], // @todo
}

export interface IFirstTimeData {
  topic: string,
  pairingString: string,
  privKey: string,
}
