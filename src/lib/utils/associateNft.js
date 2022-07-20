const {
  AccountId,
  PrivateKey,
  Client,
  TokenAssociateTransaction,
  TokenId,
} = require('@hashgraph/sdk');

const ACCOUNT_ID = AccountId.fromString(process.env.ACCOUNT_ID);
const PRIVATE_KEY = PrivateKey.fromString(process.env.PRIVATE_KEY);
const CLIENT_ID = AccountId.fromString(process.env.CLIENT_ID);
const CLIENT_KEY = PrivateKey.fromString(process.env.CLIENT_KEY);
const TOKEN_ID = TokenId.fromString(process.env.TOKEN_ID);

const client = Client.forTestnet().setOperator(ACCOUNT_ID, PRIVATE_KEY);

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

associateNft();
