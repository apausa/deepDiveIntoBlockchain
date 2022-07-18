/* eslint-disable no-console */
require('dotenv').config({ path: '../../../.env' });

const {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} = require('@hashgraph/sdk');

const ACCOUNT_ID = AccountId.fromString(process.env.ACCOUNT_ID);
const PRIVATE_KEY = PrivateKey.fromString(process.env.PRIVATE_KEY);

const client = Client.forTestnet().setOperator(ACCOUNT_ID, PRIVATE_KEY);

async function main() {
  const nftCreate = await new TokenCreateTransaction()
    .setTokenName('authentication')
    .setTokenSymbol('AUTH')
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(ACCOUNT_ID)
    .setSupplyType(TokenSupplyType.Infinite)
    .setSupplyKey(PRIVATE_KEY)
    .freezeWith(client);

  const nftCreateTxSign = await nftCreate.sign(PRIVATE_KEY);
  const nftCreateSubmit = await nftCreateTxSign.execute(client);
  const { tokenId } = await nftCreateSubmit.getReceipt(client);

  console.log(`- Created NFT with Token ID: ${tokenId} \n`);
}

main();
