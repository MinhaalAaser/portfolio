import Image from 'next/image';
import { Lato } from 'next/font/google';
import { Grenze } from 'next/font/google';
import { useContactModalStore } from '../components/zustand/contactSlice';
import Head from 'next/head';

const grenze = Grenze({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});
const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

function Pricing() {
  const toggleModal = useContactModalStore((state) => state.toggleModal);
  return (
    <div>
      <Head>
        <title>Pricing - Aaser Zypher.dev</title>
        <meta
          name="description"
          content="Pricing plans and details for my services."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${lato.className} flex w-screen items-center justify-center`}
      >
        <Image src="/pricing1.png" alt="Pricing1" width={450} height={400} />
        <Image
          src="/pricing2.png"
          alt="Pricing2"
          width={450}
          height={400}
          className="rounded-md"
        />
      </main>
    </div>
  );
}

export default Pricing;
