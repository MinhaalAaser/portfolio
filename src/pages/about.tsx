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
      <main
        className={`${lato.className} flex w-screen flex-col items-center justify-center mt-4`}
      >
        <h1 className="text-azs-1 text-shadow-lg shadow-azb-5  p-2 text-3xl mb-4 font-bold tracking-wider">
          About Me
        </h1>
        <section className="grid grid-cols-1 items-center justify-center w-3/4 mb-4 md:grid md:grid-cols-2 md:gap-4 ">
          <Image
            src="/me.jpg"
            alt="Minhaal Aaser"
            width={300}
            height={500}
            className="mx-auto md:mx-0 mb-8 md:mb-0 rounded-full shadow-azg-1 shadow-lg"
          />
          <p
            className={`${lato.className} text-azs-1 text-shadow-md shadow-azb-5 md:sm:ml-6 md:sm:text-left text-center text-xl tracking-wide`}
          >
            Hello! I&apos;m{' '}
            <span className="text-azg-2 text-shadow-md shadow-azb-5 ">
              Minhaal,
            </span>{' '}
            the mind behind{' '}
            <span
              className={`text-azg-2 tracking-wider text-shadow-md shadow-azb-5 text-xl${grenze.className}`}
            >
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
          <p className="text-azs-1 text-shadow-md shadow-azb-5 md:sm:text-left text-center mx-10 my-4 text-xl font-medium tracking-wide">
            I&apos;ve worn many hats in my career journey: from sales floors to
            customer service counters, and even the buzzing environments of
            manufacturing and warehouse operations. Each role added a layer to
            my understanding of problem-solving and people—a combination
            that&apos;s crucial in tech. <br /> <br /> In May 2024, I graduated
            from{' '}
            <a href="https://bottega.edu/" className="text-azg-2">
              Bottega University
            </a>
            , determined to mix my lifelong passion with my professional
            pursuits. That&apos;s when{' '}
            <span className={`text-azg-2 tracking-wider ${grenze.className}`}>
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
              className="text-black rounded-md px-2 py-1 bg-azg-2 text-xl hover:text-azg-2 hover:bg-azb-1 tracking-wider"
            >
              Let&apos;s build
            </a>{' '}
            something great together!
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;
