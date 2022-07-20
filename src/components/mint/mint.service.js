import {
  AccountId,
  PrivateKey,
  Client,
  TokenMintTransaction,
  TransferTransaction,
  TokenId,
} from '@hashgraph/sdk';

// eslint-disable-next-line max-len
async function transferNft(clientId, tokenId, account) {
  const { accountId, privateKey, client } = account;
  const tokenTransferTx = await new TransferTransaction()
    .addNftTransfer(tokenId, 1, accountId, clientId)
    .freezeWith(client)
    .sign(privateKey);

  const tokenTransferSubmit = await tokenTransferTx.execute(client);
  const tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

  return `${tokenTransferRx.status}`;
}

async function mintNft(tokenId, account) {
  const { client, privateKey } = account;
  const CID = ['QmTzWcVfk88JRqjTpVwHzBeULRTNzHY7mnBSG42CpwHmPa'];

  const mintTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(CID)])
    .freezeWith(client)
    .sign(privateKey);

  const mintTxSubmit = await mintTx.execute(client);
  await mintTxSubmit.getReceipt(client);
}

export default async function mintAndTransferNft(userId) {
  const clientId = AccountId.fromString(userId);
  const accountId = AccountId.fromString(process.env.NEXT_PUBLIC_ACCOUNT_ID);
  const privateKey = PrivateKey.fromString(process.env.NEXT_PUBLIC_PRIVATE_KEY);
  const client = Client.forTestnet().setOperator(accountId, privateKey);
  const account = { accountId, privateKey, client };
  const tokenId = TokenId.fromString(process.env.NEXT_PUBLIC_TOKEN_ID);

  // @todo check if user already owns the token before minting
  // @todo check if user already has the token associated minting
  await mintNft(tokenId, account);
  const status = await transferNft(clientId, tokenId, account);

  return status;
}
