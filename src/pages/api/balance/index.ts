/* eslint-disable no-underscore-dangle */
import {
  AccountId,
  PrivateKey,
  Client,
  AccountBalanceQuery,
  TokenId,
  AccountBalance,
} from '@hashgraph/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY, TOKEN_ID } = process.env;
  const clientId: AccountId = AccountId.fromString(body.walletId);
  const accountId: AccountId = AccountId.fromString(HEDERA_ACCOUNT_ID);
  const privateKey: PrivateKey = PrivateKey.fromString(HEDERA_PRIVATE_KEY);
  const tokenId: TokenId = TokenId.fromString(TOKEN_ID);
  const client: Client = Client.forTestnet().setOperator(accountId, privateKey);

  if (method === 'POST') {
    try {
      const balanceCheckTx: AccountBalance = await new AccountBalanceQuery()
        .setAccountId(clientId)
        .execute(client);

      if (balanceCheckTx.tokens) {
        const amount: Long.Long | undefined = balanceCheckTx.tokens._map.get(tokenId.toString());
        if (amount) res.status(201).json({ success: true, isMinted: !!(+amount.toString()) });
      }
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
