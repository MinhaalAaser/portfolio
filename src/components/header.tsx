import Image from 'next/image';
import Link from 'next/link';
import { Hedvig_Letters_Sans } from 'next/font/google';
import { Lato } from 'next/font/google';
import { Grenze } from 'next/font/google';
import { useContactModalStore } from './zustand/contactSlice';
import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent } from 'react';

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append('access_key', process.env.WEB3_FORM_KEY);

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
    <header className="flex w-full flex-col items-center justify-between py-2">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Aaser Zypher.dev"
            width={300}
            height={300}
          />
        </Link>
        <Dialog.Root
          open={modalState}
          onOpenChange={(open) => (open ? openModal() : closeModal())}
        >
          <Dialog.Trigger
            className={`text-xl px-6 py-3 mx-10 tracking-wider text-black bg-azo-4 rounded-md hover:bg-azo-1 ${hedvig_sans.className}`}
          >
            Contact
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-gray bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray rounded-md p-6 w-screen max-w-2xl">
            <Dialog.Title className="text-3xl text-center my-4 font-bold">
              Contact{' '}
              <span className={`${grenze.className} text-azo-3`}>
                AaserZyper.Dev
              </span>
            </Dialog.Title>
            <form
              onSubmit={handleSubmit}
              className={`${lato.className} flex flex-col items-center text-lg tracking-wider justify-center`}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-1/2  h-10 text-center m-4 rounded-md placeholder-text-gray focus:placeholder-transparent"
              />

              <input
                className="w-1/2 h-10 text-center m-4 rounded-md placeholder-text-gray focus:placeholder-transparent"
                type="email"
                name="email"
                placeholder="Email"
              />

              <textarea
                className="w-3/4 h-40 text-center m-4 rounded-md text-black placeholder-text-gray focus:placeholder-transparent"
                name="message"
                placeholder="Type your message..."
              ></textarea>

              <button
                className="px-4 py-2 m-5 text-gray text-lg tracking-wider bg-azp-3 rounded-md hover:bg-azp-1"
                type="submit"
              >
                Submit Form
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <div
        className={`flex items-center font-text-center justify-center m-5 md:justify-between ${hedvig_sans.className}`}
      >
        <Link
          href="/"
          className="px-4 py-2 mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          About
        </Link>
        <Link
          href="#portfolio"
          className="px-4 py-2 mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          Portfolio
        </Link>
        <Link
          href="#blog"
          className="px-4 py-2 mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          Blog
        </Link>
      </div>
    </header>
  );
}

export default Header;
