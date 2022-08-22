import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import Head from 'next/head';

// Components
import Connect from '../components/connect/Connect';
import Verify from '../components/verify/Verify';
import Mint from '../components/mint/Mint';

// Services
import checkBalance from '../lib/services/checkBalance';

function Home(): JSX.Element {
  const [walletId, setWalletId]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [isTransfered, setIsTransfered]: [
    boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [isHuman, setIsHuman]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const checkIsMinted: () => Promise<void> = async () => {
    const balance: SetStateAction<boolean | undefined> = await checkBalance(walletId);

    if (balance) setIsTransfered(balance);
  };

  useEffect((): void => { if (walletId) checkIsMinted(); }, [walletId]);

  return (
    <>
      <Head>
        <title>HederAuth</title>
        <meta name="description" content="Final project for UZH International Summer Schools, Deep Dive into Blockchain - Linking Economics, Technology and Law; supported by Hedera." />
        <meta property="og:title" content="HederAuth" />
        <meta property="og:description" content="Final project for UZH International Summer Schools, Deep Dive into Blockchain - Linking Economics, Technology and Law; supported by Hedera." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uzh.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="position-absolute top-50 start-50 translate-middle">
        {(!isTransfered) ? (
          <>
            <div className="pb-5 d-flex justify-content-center">
              Please, associate token ID 0.0.47712691 before minting
            </div>
            {(!walletId)
              ? <Connect setWalletId={setWalletId} />
              : null}
            {(walletId && !isHuman)
              ? (<Verify setIsHuman={setIsHuman} />)
              : null}
            {(walletId && isHuman)
              ? (<Mint walletId={walletId} setIsTransfered={setIsTransfered} />)
              : null}
          </>
        ) : (
          <div className="d-flex justify-content-center fw-bold">
            The NFT was minted, you are now verified!
          </div>
        ) }
      </main>
    </>
  );
}

export default Home;
