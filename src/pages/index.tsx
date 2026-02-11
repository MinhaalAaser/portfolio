import { Grenze, Hedvig_Letters_Sans, Lato } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContactModalStore } from '@/components/zustand/contactSlice';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});
const hedvig = Hedvig_Letters_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});
const grenze = Grenze({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function Home() {
  const toggleModal = useContactModalStore((state) => state.toggleModal);
  const isModalOpen = useContactModalStore((state) => state.isOpen);
  return (
    <div>
      <Head>
        <title>Aaser Zypher.dev</title>
        <meta name="description" content="Full Stack Web Development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" min-h-screen grid grid-rows-1 items-center content-center justify-center">
        <h1
          className={`${grenze.className} text-azs-1 text-shadow-sm shadow-azg-1 text-3xl text-center font-regular tracking-wide m-2`}
        >
          Welcome to Aaser Zypher.dev!
        </h1>
        <p
          className={`${hedvig.className} text-azs-1 grid text-shadow-sm shadow-azg-1 grid-rows-1 text-center content-center text-2xl items-center justify-center font-regular my-2 tracking-wide `}
        >
          I am
          <span
            className={`text-azg-2 my-2 text-shadow-sm shadow-azb-5 text-3xl ${grenze.className}`}
          >
            Minhaal Aaser,
          </span>
          a Full Stack Web Developer.
        </p>
        <p
          className={`${lato.className} md:sm:flex md:sm:flex-col md:sm:items-center md:sm:justify-center md:sm:mt-4 md:sm:mx-40 grid grid-rows-1 gap-3 text-center px-2 text-azs-1 text-lg font-mediumtext-shadow-sm shadow-azg-1 font-regular tracking-wider`}
        >
          I provide complete web development solutions with crisp and responsive
          Front-end UIs and secure Back-end configurations that work seamlessly
          on any device.
          <Link
            href="/about"
            className="text-azb-1 my-2 shadow-azg-2 shadow-md px-2 py-1 text-xl"
          >
            Read more about me...
          </Link>
          <Link
            href="/portfolio"
            className="text-azg-2 my-2 text-shadow-sm shadow-azb-1 shadow-md px-2 py-1 text-xl"
          >
            View my recent work...
          </Link>
          <button
            type="button"
            onClick={() => toggleModal()}
            className="p-2 my-2 bg-azs-1 text-shadow-sm shadow-azg-2 hover:cursor-pointer hover:bg-azg-1 text-azb-5 text-xl"
          >
            Contact me to get started!
          </button>
          <span className="text-azs-1 text-shadow-md shadow-azb-5 font-regular text-xl my-4">
            My current skillset includes:
          </span>
        </p>
        <div className="mt-4 flex flex-col items-center justify-center">
          <p
            className={`${hedvig.className}  text-azs-1 text-center md:text-left tracking-wide p-2 md:px-4 md:py-2 text-2xl border-2 rounded border-azg-2 font-regular`}
          >
            Front-End Development Stack:
          </p>
          <section className="items-center content-center justify-center grid grid-cols-2 gap-0 md:grid-cols-4">
            {[
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/240px-HTML5_logo_and_wordmark.svg.png',
                heading: 'HTML',
                link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/240px-CSS3_logo_and_wordmark.svg.png',
                heading: 'CSS',
                link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/240px-Sass_Logo_Color.svg.png',
                heading: 'SCSS',
                link: 'https://sass-lang.com/',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
                heading: 'Tailwind CSS',
                link: 'https://tailwindcss.com/',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png',
                heading: 'JavaScript',
                link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
              },

              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
                heading: 'React',
                link: 'https://reactjs.org/',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg',
                heading: 'Next.js',
                link: 'https://nextjs.org/',
              },
              {
                logo: 'https://cdn.worldvectorlogo.com/logos/radix-ui.svg',
                heading: 'Radix UI',
                link: 'https://www.radix-ui.com',
              },
            ].map(({ logo, heading, link }) => (
              <a
                key={heading}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-48 h-48"
              >
                <Image
                  src={logo}
                  alt={heading}
                  width={96}
                  height={96}
                  className={`h-24 w-24 ${
                    heading === 'Next.js' || heading === 'Radix UI'
                      ? 'filter invert'
                      : ''
                  }`}
                />
              </a>
            ))}
          </section>
          <p
            className={`${hedvig.className}  text-azs-1 text-center md:text-left tracking-wide p-2 md:px-4 md:py-2 text-2xl border-2 rounded border-azg-2 font-regular`}
          >
            Back-End Development Stack:
          </p>
          <section className="items-center content-center justify-center grid grid-cols-2 gap-0 md:grid-cols-4">
            {[
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Python_logo_and_wordmark.svg',
                heading: 'Python',
                link: 'https://www.python.org',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg',
                heading: 'Flask',
                link: 'https://flask.palletsprojects.com/',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
                heading: 'Postgres',
                link: 'https://postgresql.com/',
              },
              {
                logo: '/docker-mark-blue.svg',
                heading: 'Docker',
                link: 'https://www.docker.com/',
              },
              {
                logo: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
                heading: 'GitHub',
                link: 'https://github.com/',
              },
              {
                logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
                heading: 'GCP',
                link: 'https://cloud.google.com/',
              },
            ].map(({ logo, heading, link }) => (
              <a
                key={heading}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-48 h-48"
              >
                <Image
                  src={logo}
                  alt={heading}
                  width={96}
                  height={72}
                  className={`h-24 w-24 ${
                    heading === 'Flask'
                      ? isModalOpen
                        ? 'hidden'
                        : 'filter invert'
                      : heading === 'GCP'
                        ? 'bg-white'
                        : heading === 'Python'
                          ? 'bg-azs-1'
                          : ''
                  }`}
                />
              </a>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
