/* eslint-disable max-len */
import React, {
  Dispatch, SetStateAction, useState,
} from 'react';
import Head from 'next/head';
import Script from 'next/script';

// Components
import Connect from '../components/connect/Connect';

function Home() {
  const [isConnected, setIsConnected]: [string, Dispatch<SetStateAction<string>>] = useState('');

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
      <main className="container shadow rounded position-absolute top-50 start-50 translate-middle">
        <Connect isConnected={isConnected} setIsConnected={setIsConnected} />
      </main>
    </>
  );
}

export default Home;
