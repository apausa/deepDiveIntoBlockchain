/* eslint-disable max-len */
import React, {
  Dispatch, SetStateAction, useState,
} from 'react';
import Head from 'next/head';
import Script from 'next/script';

// Components
import Verify from '../components/verify/Verify';
import Connect from '../components/connect/Connect';
import Mint from '../components/mint/Mint';

function Home() {
  const [isConnected, setIsConnected]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [isHuman, setIsHuman]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

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
      <main>
        <Connect isConnected={isConnected} setIsConnected={setIsConnected} />
        <Verify isConnected={isConnected} isHuman={isHuman} setIsHuman={setIsHuman} />
        <Mint isHuman={isHuman} />
      </main>
    </>
  );
}

export default Home;
