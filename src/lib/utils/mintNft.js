/* eslint-disable no-console */
require('dotenv').config({ path: '../../../.env' });

const {
  AccountId,
  PrivateKey,
  Client,
  TokenMintTransaction,
  TransferTransaction,
  TokenAssociateTransaction,
  TokenId,
} = require('@hashgraph/sdk');

const ACCOUNT_ID = AccountId.fromString(process.env.ACCOUNT_ID);
const PRIVATE_KEY = PrivateKey.fromString(process.env.PRIVATE_KEY);
const CLIENT_ID = AccountId.fromString(process.env.CLIENT_ID);
const CLIENT_KEY = PrivateKey.fromString(process.env.CLIENT_KEY);
const TOKEN_ID = TokenId.fromString(process.env.TOKEN_ID);

const client = Client.forTestnet().setOperator(ACCOUNT_ID, PRIVATE_KEY);

async function transferNft() {
  const tokenTransferTx = await new TransferTransaction()
    .addNftTransfer(TOKEN_ID, 1, ACCOUNT_ID, CLIENT_ID)
    .freezeWith(client)
    .sign(PRIVATE_KEY);

  const tokenTransferSubmit = await tokenTransferTx.execute(client);
  const tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

  console.log(`- NFT transfer from Treasury to Client: ${tokenTransferRx.status} \n`);
}

async function associateNft() {
  const associateClientTx = await new TokenAssociateTransaction()
    .setAccountId(CLIENT_ID)
    .setTokenIds([TOKEN_ID])
    .freezeWith(client)
    .sign(CLIENT_KEY);

  const associateClientTxSubmit = await associateClientTx.execute(client);
  const associateClientRx = await associateClientTxSubmit.getReceipt(client);

  console.log(`- NFT association with Client's account: ${associateClientRx.status}\n`);
}

async function mintNft() {
  const CID = ['QmTzWcVfk88JRqjTpVwHzBeULRTNzHY7mnBSG42CpwHmPa'];

  const mintTx = await new TokenMintTransaction()
    .setTokenId(TOKEN_ID)
    .setMetadata([Buffer.from(CID)])
    .freezeWith(client)
    .sign(PRIVATE_KEY);

  const mintTxSubmit = await mintTx.execute(client);
  const mintRx = await mintTxSubmit.getReceipt(client);

  console.log(`- Created NFT ${TOKEN_ID} with serial: ${mintRx.serials[0].low} \n`);
}

async function main() {
  await mintNft();
  await associateNft();
  await transferNft();
}

main();
