
# Hederauth

Final project for UZH International Summer Schools, Deep Dive into Blockchain – Linking Economics, Technology and Law; in collaboration with Hedera.


## Appendix

Next.js and TypeScript application to verify Hedera's blockchain real users.

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


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Features

- Smart contract to create a non fungible token
- Smart contract to check account balance
- Smart contract to mint a non fungible token
- Smart contract to transfer a non fungible token
- Wallet connection

## Feedback

If you have any feedback, please reach out to us at apausa@pablu.xyz

## License

[MIT](https://choosealicense.com/licenses/mit/)


![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```
