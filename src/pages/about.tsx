import Footer from '@/components/footer';
import Header from '@/components/header';
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

function About() {
  const toggleModal = useContactModalStore((state) => state.toggleModal);
  return (
    <div>
      <Head>
        <title>About me - Aaser Zypher.dev</title>
        <meta
          name="description"
          content="View more details about my life and work!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main
        className={`${lato.className} flex w-screen min-h-screen flex-col items-center justify-center`}
      >
        <h1 className="text-azp-1 text-3xl mb-4 font-bold tracking-wider">
          About Me
        </h1>
        <section className="flex flex-col items-center justify-center w-3/4 mb-4 md:sm:flex-row ">
          <Image
            src="/headshot.png"
            alt="Minhaal Aaser"
            width={300}
            height={500}
            className="rounded-md"
          />
          <p
            className={`${lato.className} text-gray mt-6 md:sm:ml-6 md:sm:text-left text-center text-xl font-light tracking-wide`}
          >
            Hello! I&apos;m <span className="text-azp-1">Minhaal,</span> the
            mind behind{' '}
            <span className={`text-azo-1 ${grenze.className}`}>
              AaserZypher.dev
            </span>
            <br /> <br /> Born and raised in the bustling city of Karachi,
            Pakistan, I&apos;ve always been captivated by the world of computers
            and technology. Fast forward to today, and you&apos;ll find me in
            the scenic landscapes of Wisconsin, USA—still glued to my screen,
            but with a purpose.
          </p>
        </section>
        <section>
          <p className="text-gray md:sm:text-left text-center mx-10 my-4 text-xl font-light tracking-wide">
            I&apos;ve worn many hats in my career journey: from sales floors to
            customer service counters, and even the buzzing environments of
            manufacturing and warehouse operations. Each role added a layer to
            my understanding of problem-solving and people—a combination
            that&apos;s crucial in tech. <br /> <br /> In May 2024, I graduated
            from{' '}
            <a href="https://bottega.edu/" className="text-azo-1">
              Bottega University
            </a>
            , determined to mix my lifelong passion with my professional
            pursuits. That&apos;s when{' '}
            <span className={`text-azo-1 ${grenze.className}`}>
              AaserZypher.dev
            </span>{' '}
            was born. Here, I offer Full Stack Web Development solutions that
            are as comprehensive as my journey—from A to Z. <br /> <br />{' '}
            <a
              href="#blank"
              onClick={(e) => {
                e.preventDefault();

                toggleModal();
              }}
              className="text-black rounded-md px-2 py-1 bg-azo-1 text-l font-normal tracking-wider"
            >
              Let&apos;s build
            </a>{' '}
            something great together!
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
