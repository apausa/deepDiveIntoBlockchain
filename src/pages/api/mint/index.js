/* eslint-disable max-len */
import {
  AccountId,
  PrivateKey,
  Client,
  TokenMintTransaction,
  TokenId,
} from '@hashgraph/sdk';

export default async function handler(req, res) {
  const { method } = req;
  const { ACCOUNT_ID, PRIVATE_KEY, TOKEN_ID } = process.env;
  const accountId = AccountId.fromString(ACCOUNT_ID);
  const privateKey = PrivateKey.fromString(PRIVATE_KEY);
  const tokenId = TokenId.fromString(TOKEN_ID);
  const client = Client.forTestnet().setOperator(accountId, privateKey);
  const CID = ['QmTzWcVfk88JRqjTpVwHzBeULRTNzHY7mnBSG42CpwHmPa'];
  if (method === 'GET') {
    try {
      const mintTx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from(CID)])
        .freezeWith(client)
        .sign(privateKey);

      const mintTxSubmit = await mintTx.execute(client);
      const data = await mintTxSubmit.getReceipt(client);
      res.status(201).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
