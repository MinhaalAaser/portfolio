import { Grenze } from 'next/font/google';
import { Hedvig_Letters_Sans } from 'next/font/google';
import { Lato } from 'next/font/google';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aaser Zypher.dev',
  description: 'Your Vision: Our Expertise. Full Stack Web Developer',
  keywords:
    'portfolio, web design, web developer, web development, full-stack, full stack web development, html, css, next.js, javascript, python, python flask, Github, small business',
};
const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});
const hedvig_sans = Hedvig_Letters_Sans({
  weight: '400',
  subsets: ['latin'],
});
const grenze = Grenze({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex w-screen min-h-screen flex-col items-center justify-center text-left">
        <h1
          className={`${hedvig_sans.className} text-gray text-3xl font-regular tracking-wide mb-2`}
        >
          Welcome to{' '}
          <span className={`${grenze.className} text-azo-3`}>
            Aaser Zypher.dev!
          </span>
        </h1>
        <p
          className={`${hedvig_sans.className} text-gray text-2xl font-regular my-1 tracking-wide `}
        >
          I am{' '}
          <span className={`text-azp-1 ${grenze.className}`}>
            Minhaal Aaser,
          </span>{' '}
          a Full Stack Web Developer.
        </p>
        <div className="mt-4 w-full flex flex-col md:flex-row items-start justify-center">
          <p
            className={`${lato.className}  text-gray tracking-wide mb-4 text-xl font-regular`}
          >
            Front-End Development Stack:
          </p>
          <section className=" w-screen items-center justify-center flex md:grid-cols-4 md:grid ">
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
                logo: '/next.svg',
                heading: 'Next.js',
                link: 'https://nextjs.org/',
              },
              {
                logo: '/radix-ui.svg',
                heading: 'Radix UI',
                link: 'https://www.radix-ui.com',
              },
            ].map(({ logo, heading, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className=" flex flex-col items-center justify-center m-1 w-40 h-40 text-azp-1 hover:bg-azo-1 transition duration-200 text-lg font-regular tracking-wide"
              >
                <Image
                  src={logo}
                  alt={heading}
                  width={96}
                  height={96}
                  className={`h-24 mb-2 ${
                    heading === 'Next.js' || heading === 'Radix UI'
                      ? 'filter invert'
                      : ''
                  }`}
                />
                {heading}
              </a>
            ))}
          </section>
          <p
            className={`${lato.className}  text-gray tracking-wide mb-4 mt-4 text-xl font-regular`}
          >
            Back-End Development Stack:
          </p>
          <section className="grid w-full grid-cols-4 grid-flow-row gap-0">
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
                logo: 'https://upload.wikimedia.org/wikipedia/labs/8/8e/Mysql_logo.png',
                heading: 'MySQL',
                link: 'https://mysql.com/',
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
            ].map(({ logo, heading, link }, index) => (
              <div
                key={index}
                className={
                  '${lato.className} text-thin text-sm flex flex-col items-center justify-center w-36 h-36 hover:bg-azo-1 p-4 rounded-md text-azp-1 bg-black hover:bg-gray-200 transition duration-300'
                }
              >
                <Image
                  src={logo}
                  alt={heading}
                  width={96}
                  height={96}
                  className={`h-24 w-24 p-2 ${
                    heading === 'Flask' ? 'filter invert' : ''
                  }`}
                />
                <div className="mt-1">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-lg font-regular hover:bg-azo-1 rounded-md transition duration-300"
                  >
                    {heading}
                  </a>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
