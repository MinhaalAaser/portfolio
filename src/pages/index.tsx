import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <header className="flex w-full flex-col items-center justify-between py-12">
        <nav className="flex flex-col w-full max-w-5xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/img/logo.png"
              alt="Aaser Zypher.dev"
              width={50}
              height={50}
            />
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-4">
            <a
              href="#portfolio"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Portfolio
            </a>
            <a
              href="#blog"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Blog
            </a>
          </div>

          {/* Contact Button */}
          <a
            href="mailto:minhaal@aaserzypher.dev"
            className="hidden md:flex px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Contact
          </a>
        </nav>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold">Welcome to Aaser Zypher.dev!</h1>
          <p className="mt-4 text-xl">
            Hi! I am Minhaal Aaser, an aspiring full stack web developer.
          </p>
          <div className="mt-8 space-x-4">
            <a
              href="#portfolio"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Portfolio
            </a>
            <a
              href="#blog"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Blog
            </a>
          </div>
        </div>
      </header>
      <footer className="mt-12 flex flex-col w-full items-center justify-center md:flex-row border-t border-gray-300 p-4">
        <p className="text-center text-white-600 text-shadow-md-red">
          Copyright &copy; {new Date().getFullYear()} AaserZypher.dev
        </p>
        <div className="mt-4 flex items-center">
          <span className="text-gray-500">Powered by </span>
          <a
            href="https://nextjs.org/"
            className="ml-1 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={72}
              height={24}
              priority
            />
          </a>
        </div>
      </footer>
    </main>
  );
}
