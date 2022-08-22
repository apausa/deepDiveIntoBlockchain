require('dotenv').config({ path: '../../../.env' });

const {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
} = require('@hashgraph/sdk');

const HEDERA_ACCOUNT_ID = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);
const HEDERA_PRIVATE_KEY = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY);

async function createNft() {
  const nftCreate = await new TokenCreateTransaction()
    .setTokenName('Authentication')
    .setTokenSymbol('AUTH')
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(HEDERA_ACCOUNT_ID)
    .setSupplyType(TokenSupplyType.Infinite)
    .setSupplyKey(HEDERA_PRIVATE_KEY)
    .freezeWith(client);

  const nftCreateTxSign = await nftCreate.sign(HEDERA_PRIVATE_KEY);
  const nftCreateSubmit = await nftCreateTxSign.execute(client);
  const { tokenId } = await nftCreateSubmit.getReceipt(client);

  // eslint-disable-next-line no-console
  console.log(`- Created NFT with Token ID: ${tokenId} \n`);
}

createNft();
