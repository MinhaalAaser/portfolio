import Image from 'next/image';
import Link from 'next/link';
import { Hedvig_Letters_Sans } from 'next/font/google';
import { Lato } from 'next/font/google';
import { Grenze } from 'next/font/google';
import { useContactModalStore } from '../components/zustand/contactSlice';
import { useNavStore } from './zustand/navSlice';
import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent } from 'react';
import { Menu, X } from 'lucide-react';

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

function Header() {
  const modalState = useContactModalStore((state) => state.isOpen);
  const openModal = useContactModalStore((state) => state.openModal);
  const closeModal = useContactModalStore((state) => state.closeModal);
  const navState = useNavStore((state) => state.isOpen);
  const toggleNav = useNavStore((state) => state.toggleMenu);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append('access_key', 'a36f3058-9f5e-4e43-bd1f-930c123ea325');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
      closeModal();
    } else {
      console.log(result);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <header className="flex flex-col items-center justify-between">
      <div className="grid grid-cols-2 gap-4 items-center justify-center">
        <Link href="/" className="border-radius">
          <Image
            src="/AZ-logo-nobg-2.svg"
            alt="Aaser Zypher.dev"
            width={240}
            height={300}
            priority={true}
          />
        </Link>
        <section className="grid grid-rows-1 gap-8 items-center justify-center">
          <Dialog.Root
            open={modalState}
            onOpenChange={(open) => (open ? openModal() : closeModal())}
          >
            <Dialog.Trigger
              className={`text-xl px-6 py-3 mx-10 tracking-wider font-bold text-azb-5 bg-azg-2 rounded-md hover:bg-azb-1 hover:text-azg-2 ${lato.className}`}
            >
              Contact
            </Dialog.Trigger>
            <Dialog.Overlay
              className="fixed inset-0 bg-black md:sm:bg-gray md:sm:bg-opacity-30 md:sm:backdrop-blur-sm flex items-center justify-center w-full"
              style={{ backdropFilter: 'none' }}
            />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-azs-2 rounded-md p-6 w-screen max-w-2xl">
              <Dialog.Title
                className={`${grenze.className} text-3xl text-shadow-md shadow-azb-5 tracking-wider text-azg-2 text-center my-4 font-bold`}
              >
                Contact Me
              </Dialog.Title>
              <form
                onSubmit={handleSubmit}
                className={`${lato.className} flex flex-col items-center text-lg tracking-wider justify-center`}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-1/2  h-10 text-center m-4 rounded-md placeholder-text-azb-4 focus:placeholder-transparent"
                />

                <input
                  className="w-1/2 h-10 text-center m-4 rounded-md placeholder-text-azb-4 focus:placeholder-transparent"
                  type="email"
                  required={true}
                  name="email"
                  placeholder="Email"
                />

                <textarea
                  className="w-3/4 h-40 text-center m-4 rounded-md p-2 text-black placeholder-text-azb-4 focus:text-margin-5 focus:text-left focus:placeholder-transparent"
                  name="message"
                  required={true}
                  placeholder="Type your message..."
                ></textarea>

                <button
                  className="px-4 py-2 m-5 text-azs-1 text-lg tracking-wider bg-azb-4 rounded-md hover:bg-azb-2"
                  type="submit"
                >
                  Submit Form
                </button>
              </form>
            </Dialog.Content>
          </Dialog.Root>
          <section className="grid grid-cols-3 gap-4 items-center justify-center">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61564678755375"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/640px-2023_Facebook_icon.svg.png"
                alt="Facebook"
                width={50}
                height={50}
              />
            </a>
            <a target="_blank" href="https://github.com/MinhaalAaser">
              <Image
                src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                alt="Github"
                className={modalState ? 'hidden' : 'filter invert'}
                width={50}
                height={50}
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/minhaal-aaser/"
              className="filter brightness-150 "
            >
              <Image
                src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                alt="Linkedin"
                width={50}
                height={50}
              />
            </a>
          </section>
        </section>
      </div>

      <div
        className={`hidden md:grid gap-2 grid-flow-col items-center font-text-center justify-center mb-4 md:gap-4 md:grid-cols-5 ${hedvig_sans.className}`}
      >
        <Link
          href="/"
          className="flex items-center tracking-wider justify-center px-4 py-2 md:mx-5 text-azb-5 font-bold text-xl bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="flex items-center justify-center tracking-wider px-4 py-2 md:mx-5 text-azb-5 font-bold text-xl bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
        >
          About
        </Link>
        <Link
          href="/portfolio"
          className="flex items-center justify-center tracking-wider px-4 py-2 md:mx-5 text-azb-5 font-bold text-xl bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
        >
          Portfolio
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-center tracking-wider px-4 py-2 md:mx-5 text-azb-5 font-bold text-xl bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
        >
          Blog
        </Link>
        <Link
          href="/pricing"
          className="flex items-center justify-center tracking-wider px-4 py-2 md:mx-5 text-azb-5 font-bold text-xl bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
        >
          Pricing
        </Link>
      </div>

      <div className="md:hidden p-2 flex items-center justify-center">
        <button
          onClick={toggleNav}
          className="p-2 text-azg-2 text-shadow-lg shadow-azb-5 bg-azb-1 rounded-full mb-4 hover:text-azb-1 hover:bg-azg-2 focus:outline-none md:mb-0"
        >
          {navState ? <X size={48} /> : <Menu size={48} />}
        </button>
      </div>

      {navState && (
        <div
          className={`flex flex-col gap-2 items-center font-text-center justify-center ${hedvig_sans.className} mt-6 md:hidden `}
        >
          <Link
            href="/"
            className="w-full text-center px-4 py-2 text-azb-5 font-bold text-lg bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
            onClick={toggleNav}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="w-full text-center px-4 py-2 text-azb-5 font-bold text-lg bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
            onClick={toggleNav}
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className="w-full text-center px-4 py-2 text-azb-5 font-bold text-lg bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
            onClick={toggleNav}
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            className="w-full text-center px-4 py-2 text-azb-5 font-bold text-lg bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
            onClick={toggleNav}
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="w-full text-center px-4 py-2 text-azb-5 font-bold text-lg bg-azg-2 rounded-md hover:text-azg-2 hover:bg-azb-1"
            onClick={toggleNav}
          >
            Pricing
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
