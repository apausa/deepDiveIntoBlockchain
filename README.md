
# Hederauth

Next.js and TypeScript application to verify Hedera's blockchain real users.

## Appendix

Once users have paired their wallets, and confirmed that they are not robots, they can mint a non fungible token in their wallets.
This token can then be retrieved by 3rd parties for confirmation. 

## Run Locally

Clone the project

```bash
  git clone https://github.com/apausa/uzh
```

Go to the project directory

```bash
  cd uzh
```

Install dependencies

```bash
  npm install
```

Install environment variables
```bash
  vercel env pull .env.local
```

Replace routes to
```bash
http://localhost:3000
```

Start the server

```bash
  npm run start
```


## Features

- Smart contract to create a non fungible token
- Smart contract to check account balance
- Smart contract to mint a non fungible token
- Smart contract to transfer a non fungible token
- Wallet connection


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** React, Bootstrap and Hashconnect (to interact with the HashPack browser wallet).

**Server:** Node and Hashgraph SDK (to interact with the Hedera blockchain).


## Usage/Examples

### Create token 

```javascript
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
```

### Mint token

```javascript
    const mintTx: Transaction = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(CID)])
      .freezeWith(client)
      .sign(privateKey);
    const mintTxSubmit: TransactionResponse = await mintTx.execute(client);
    const receipt: TransactionReceipt = await mintTxSubmit.getReceipt(client);
```

### Transfer token 

```javascript
    const tokenTransferTx: Transaction = await new TransferTransaction()
      .addNftTransfer(tokenId, 1, accountId, clientId)
      .freezeWith(client)
      .sign(privateKey);
    const tokenTransferSubmit: TransactionResponse = await tokenTransferTx.execute(client);
    const receipt: TransactionReceipt = await tokenTransferSubmit.getReceipt(client);
```


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out to us at apausa@pablu.xyz
