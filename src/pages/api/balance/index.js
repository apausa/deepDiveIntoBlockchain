/* eslint-disable no-underscore-dangle */
import {
  AccountId,
  PrivateKey,
  Client,
  AccountBalanceQuery,
  TokenId,
} from '@hashgraph/sdk';

export default async function handler(req, res) {
  const { method, body } = req;
  const { ACCOUNT_ID, PRIVATE_KEY, TOKEN_ID } = process.env;
  const clientId = AccountId.fromString(body.isConnected);
  const accountId = AccountId.fromString(ACCOUNT_ID);
  const privateKey = PrivateKey.fromString(PRIVATE_KEY);
  const tokenId = TokenId.fromString(TOKEN_ID);
  const client = Client.forTestnet().setOperator(accountId, privateKey);

  if (method === 'POST') {
    try {
      const balanceCheckTx = await new AccountBalanceQuery()
        .setAccountId(clientId)
        .execute(client);

      const number = `${balanceCheckTx.tokens._map.get(tokenId.toString())}`;
      const isOwned = number !== '0';

      res.status(201).json({ success: true, isOwned });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
