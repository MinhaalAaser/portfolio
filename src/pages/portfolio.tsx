import Footer from '@/components/footer';
import Header from '@/components/header';
import { Lato } from 'next/font/google';
import React from 'react';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});
function Portfolio() {
  return (
    <div
      className={`${lato.className} flex flex-col items-center justify-center`}
    >
      <Header />
      <h1 className="text-3xl font-bold text-azo-1">Portfolio</h1>
      <h2 className="text-3xl font-bold text-azp-1">Coming Soon</h2>
      <h3 className="text-3xl font-bold text-azo-2">Stay Tuned</h3>
      <Footer />
    </div>
  );
}

export default Portfolio;
