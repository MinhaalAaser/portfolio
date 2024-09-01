import React from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Grenze } from 'next/font/google';
import { Lato } from 'next/font/google';
import { Noto_Serif } from 'next/font/google';
import Head from 'next/head';

const grenze = Grenze({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});
const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

const noto_serif = Noto_Serif({
  weight: '400',
  subsets: ['latin'],
});

function Blog() {
  return (
    <div>
      <Head>
        <title>Blog - Aaser Zypher.dev</title>
        <meta
          name="description"
          content="Weekly tidbits from my life or work that I find interesting."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main
        className={`${grenze.className} flex w-screen min-h-screen flex-col items-center justify-start`}
      >
        <h1 className="text-3xl tracking-wider font-bold text-azo-1">Blog</h1>
      </main>
      <Footer />
    </div>
  );
}

export default Blog;
