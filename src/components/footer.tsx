import Image from 'next/image';
import { Hedvig_Letters_Sans } from 'next/font/google';

const hedvig_sans = Hedvig_Letters_Sans({
  weight: '400',
  subsets: ['latin'],
});

function Footer() {
  return (
    <footer
      className={`mt-12 flex flex-col w-full items-center justify-center md:flex-row border-t-4 border-azp-3 bg-black p-4 ${hedvig_sans.className}`}
    >
      <p className="text-center text-white tracking-wider">
        Copyright &copy; {new Date().getFullYear()} AaserZypher.dev
      </p>
      <div className="mt-4 md:mt-0 md:ml-20 flex items-center">
        <span className="text-gray tracking-wide">Powered by </span>
        <a
          href="https://nextjs.org/"
          className="ml-1 flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
            alt="Next.js Logo"
            width={72}
            height={24}
            priority
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
