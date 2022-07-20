import {
  AccountId,
  PrivateKey,
  Client,
  TokenMintTransaction,
  TransferTransaction,
  TokenId,
} from '@hashgraph/sdk';

import { IAccount } from '../../lib/types';

// eslint-disable-next-line max-len
async function transferNft(clientId: AccountId, tokenId: TokenId, account: IAccount): Promise<string> {
  const { accountId, privateKey, client } = account;
  const tokenTransferTx = await new TransferTransaction()
    .addNftTransfer(tokenId, 1, accountId, clientId)
    .freezeWith(client)
    .sign(privateKey);

  const tokenTransferSubmit = await tokenTransferTx.execute(client);
  const tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

  return `${tokenTransferRx.status}`;
}

async function mintNft(tokenId: TokenId, account: IAccount): Promise<void> {
  const { client, privateKey } = account;
  const CID: any = ['QmTzWcVfk88JRqjTpVwHzBeULRTNzHY7mnBSG42CpwHmPa'];

  const mintTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(CID)])
    .freezeWith(client)
    .sign(privateKey);

  const mintTxSubmit = await mintTx.execute(client);
  await mintTxSubmit.getReceipt(client);
}

export default async function mintAndTransferNft(userId: string): Promise<string> {
  const clientId: AccountId = AccountId.fromString(userId);
  const accountId: AccountId = AccountId.fromString(`${process.env.ACCOUNT_ID}`);
  const privateKey: PrivateKey = PrivateKey.fromString(`${process.env.PRIVATE_KEY}`);
  const client: Client = Client.forTestnet().setOperator(accountId, privateKey);
  const account: IAccount = { accountId, privateKey, client };
  const tokenId: TokenId = TokenId.fromString(`${process.env.TOKEN_ID}`);

  // @todo check if user already owns the token before minting
  // @todo check if user already has the token associated minting
  await mintNft(tokenId, account);
  const status: string = await transferNft(clientId, tokenId, account);

  return status;
}
