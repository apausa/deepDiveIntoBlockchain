import { AccountId, Client, PrivateKey } from '@hashgraph/sdk';
import { HashConnectTypes } from 'hashconnect';

export interface IResponse {
  success: boolean,
  challenge_ts: Date,
  hostname: string,
  ['error-codes']?: any
}

export interface IData {
  topic: string,
  pairingString: string,
  privKey: string,
  metadata: HashConnectTypes.WalletMetadata,
  accountIds: string[],
}

export interface IAccount {
  accountId:AccountId,
  privateKey:PrivateKey,
  client:Client
}
