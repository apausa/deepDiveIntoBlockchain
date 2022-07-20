/* eslint-disable max-len */
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import Head from 'next/head';
import Script from 'next/script';

// Components
import Connect from '../components/connect/Connect';
import Verify from '../components/verify/Verify';
import Mint from '../components/mint/Mint';
import { checkBalance } from '../components/mint/mint.service';

function Home() {
  const [isConnected, setIsConnected]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [isHuman, setIsHuman]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [isMinted, setIsMinted]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const checkIsOwned = async () => {
    if (!isConnected) return;

    const isOwned = await checkBalance(isConnected);

    // @todo fix when there is an error is set as false
    setIsMinted(isOwned);
  };

  useEffect(() => { checkIsOwned(); }, [isConnected]);

  return (
    <>
      <Head>
        <title>UZH</title>
        <meta name="description" content="UZH International Summer Schools, Deep Dive into Blockchain" />
        <meta property="og:title" content="UZH" />
        <meta property="og:description" content="UZH International Summer Schools, Deep Dive into Blockchain" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uzh.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://www.google.com/recaptcha/api.js" async defer strategy="lazyOnload" />
      <main className="position-absolute top-50 start-50 translate-middle">
        {(!isMinted) ? (
          <div className="pb-5 d-flex justify-content-center">
            Please, associate token ID 0.0.47712691 before minting
          </div>
        ) : null }
        {(!isMinted && !isConnected) ? <Connect setIsConnected={setIsConnected} /> : null}
        {(!isMinted && isConnected && !isHuman) ? (<Verify setIsHuman={setIsHuman} />) : null}
        {(isHuman && !isMinted) ? (<Mint isConnected={isConnected} setIsMinted={setIsMinted} />) : null}
        {(isMinted) ? (
          <div className="d-flex justify-content-center fw-bold">
            The NFT was minted, you are now verified!
          </div>
        ) : null}
      </main>
    </>
  );
}

export default Home;
