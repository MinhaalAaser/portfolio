import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
