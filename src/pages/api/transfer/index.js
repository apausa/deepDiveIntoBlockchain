import {
  AccountId,
  PrivateKey,
  Client,
  TransferTransaction,
  TokenId,
} from '@hashgraph/sdk';

export default async function handler(req, res) {
  const { method, body } = req;
  const { ACCOUNT_ID, PRIVATE_KEY, TOKEN_ID } = process.env;
  const clientId = AccountId.fromString(body.userId);
  const accountId = AccountId.fromString(ACCOUNT_ID);
  const privateKey = PrivateKey.fromString(PRIVATE_KEY);
  const tokenId = TokenId.fromString(TOKEN_ID);
  const client = Client.forTestnet().setOperator(accountId, privateKey);

  if (method === 'POST') {
    try {
      const tokenTransferTx = await new TransferTransaction()
        .addNftTransfer(tokenId, 1, accountId, clientId)
        .freezeWith(client)
        .sign(privateKey);

      const tokenTransferSubmit = await tokenTransferTx.execute(client);
      const data = await tokenTransferSubmit.getReceipt(client);

      res.status(201).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
