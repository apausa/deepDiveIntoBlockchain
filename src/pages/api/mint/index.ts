/* eslint-disable max-len */
import {
  AccountId,
  PrivateKey,
  Client,
  TokenMintTransaction,
  TokenId,
  Transaction,
  TransactionResponse,
  TransactionReceipt,
} from '@hashgraph/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY, TOKEN_ID } = process.env;
  const accountId: AccountId = AccountId.fromString(HEDERA_ACCOUNT_ID);
  const privateKey: PrivateKey = PrivateKey.fromString(HEDERA_PRIVATE_KEY);
  const tokenId: TokenId = TokenId.fromString(TOKEN_ID);
  const client: Client = Client.forTestnet().setOperator(accountId, privateKey);
  const CID: any = ['QmTzWcVfk88JRqjTpVwHzBeULRTNzHY7mnBSG42CpwHmPa'];

  if (method === 'GET') {
    try {
      const mintTx: Transaction = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from(CID)])
        .freezeWith(client)
        .sign(privateKey);
      const mintTxSubmit: TransactionResponse = await mintTx.execute(client);
      const receipt: TransactionReceipt = await mintTxSubmit.getReceipt(client);

      res.status(201).json({ success: true, receipt });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
