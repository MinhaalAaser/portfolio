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
  const ctaClass =
    'm-2 inline-flex w-fit items-center justify-center justify-self-center self-center rounded-md border-2 border-azg-2 px-4 py-2 text-xl font-bold shadow-md transition-colors hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-azg-2 focus:ring-offset-2 focus:ring-offset-azb-5';

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
        <div
          className={`${lato.className} md:sm:flex md:sm:flex-col md:sm:items-center md:sm:justify-center md:sm:mt-4 md:sm:mx-40 grid grid-rows-1 gap-3 text-center px-2 text-azs-1 text-lg font-medium text-shadow-sm shadow-azg-1 font-regular tracking-wider`}
        >
          I provide complete web development solutions with crisp and responsive
          Front-end UIs and secure Back-end configurations that work seamlessly
          on any device.
          <Link
            href="/about"
            className={`${ctaClass} bg-azs-1 text-azb-1 shadow-azg-2 hover:bg-azg-1 hover:text-azb-5`}
          >
            Read more about me...
          </Link>
          <Link
            href="/portfolio"
            className={`${ctaClass} bg-azb-5 text-azg-2 shadow-azb-1 hover:bg-azg-2 hover:text-azb-5`}
          >
            View my recent work...
          </Link>
          <button
            type="button"
            onClick={() => toggleModal()}
            className={`${ctaClass} bg-azs-1 text-azb-5 shadow-azg-2 hover:cursor-pointer hover:bg-azg-1`}
          >
            Contact me to get started!
          </button>
          <span className="text-azs-1 text-shadow-md shadow-azb-5 font-regular text-xl my-4">
            My current skillset includes:
          </span>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
          <p
            className={`${hedvig.className}  text-azs-1 text-center md:text-left tracking-wide p-2 md:px-4 md:py-2 text-2xl border-2 rounded border-azg-2 font-regular`}
          >
            Front-End Development Stack:
          </p>
          <section className="items-center content-center justify-center grid grid-cols-2 gap-0 md:grid-cols-4">
            {[
              {
                logo: '/logos/HTML5 Logo.svg',
                heading: 'HTML',
                link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
              },
              {
                logo: '/logos/css-icon.svg',
                heading: 'CSS',
                link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
              },
              {
                logo: '/logos/Sass_Logo_Color.svg',
                heading: 'SCSS',
                link: 'https://sass-lang.com/',
              },
              {
                logo: '/logos/Tailwind_CSS_Logo.svg',
                heading: 'Tailwind CSS',
                link: 'https://tailwindcss.com/',
              },
              {
                logo: '/logos/javascript-logo-svgrepo-com.svg',
                heading: 'JavaScript',
                link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
              },

              {
                logo: '/logos/reactjs-svgrepo-com.svg',
                heading: 'React',
                link: 'https://reactjs.org/',
              },
              {
                logo: '/logos/Next-js_Logo_0.svg',
                heading: 'Next.js',
                link: 'https://nextjs.org/',
              },
              {
                logo: '/logos/radix-ui.svg',
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
                logo: '/logos/Python-logo-notext.svg',
                heading: 'Python',
                link: 'https://www.python.org',
              },
              {
                logo: '/logos/flask.svg',
                heading: 'Flask',
                link: 'https://flask.palletsprojects.com/',
              },
              {
                logo: '/logos/Postgresql_elephant.svg',
                heading: 'Postgres',
                link: 'https://postgresql.com/',
              },
              {
                logo: '/logos/docker-mark-blue.svg',
                heading: 'Docker',
                link: 'https://www.docker.com/',
              },
              {
                logo: '/logos/GitHub-Icon-White-Logo.wine.svg',
                heading: 'GitHub',
                link: 'https://github.com/',
              },
              {
                logo: '/logos/Google_Cloud_logo.svg',
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
