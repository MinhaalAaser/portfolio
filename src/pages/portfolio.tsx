import React from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Lato } from 'next/font/google';
import Head from 'next/head';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

function Portfolio() {
  return (
    <div>
      <Head>
        <title>Portfolio - Aaser Zypher.dev</title>
        <meta name="description" content="View my newest work!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main
        className={`${lato.className} flex w-screen min-h-screen flex-col items-center justify-start`}
      >
        <h1 className="text-3xl font-bold text-azo-1">Portfolio</h1>
        <h2 className="text-3xl font-bold text-azp-1">Coming Soon</h2>
        <h3 className="text-3xl font-bold text-azo-2">Stay Tuned</h3>
      </main>
      <Footer />
    </div>
  );
}

export default Portfolio;
