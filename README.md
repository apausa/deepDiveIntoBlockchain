
# Hederauth

Worked with a group of international students on a blockchain-based solution, supported by Hedera Hashgraph. Next.js and TypeScript application to verify Hedera's blockchain real users.

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

## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out to us at apausa@pablu.xyz
