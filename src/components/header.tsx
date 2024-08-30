import Image from 'next/image';
import Link from 'next/link';
import { Hedvig_Letters_Sans } from 'next/font/google';
import { Lato } from 'next/font/google';
import { Grenze } from 'next/font/google';
import { useContactModalStore } from '../components/zustand/contactSlice';
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
      // closeModal();
    } else {
      console.log(result);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <header className="flex w-screen flex-col items-center justify-between">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/facebook.png"
            alt="Aaser Zypher.dev"
            width={300}
            height={300}
            priority={true}
          />
        </Link>
        <section className="grid grid-rows-1 gap-4 items-center justify-center">
          <Dialog.Root
            open={modalState}
            onOpenChange={(open) => (open ? openModal() : closeModal())}
          >
            <Dialog.Trigger
              className={`text-xl px-6 py-3 mx-10 tracking-wider font-bold text-azp-3 bg-azo-5 rounded-md hover:bg-azo-1 ${lato.className}`}
            >
              Contact
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 bg-gray bg-opacity-50 backdrop-blur-sm flex items-center justify-center w-full" />
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
                className="filter invert"
                width={50}
                height={50}
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/minhaal-aaser/"
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
        className={`grid gap-3 grid-cols-2 items-center font-text-center justify-center m-5 md:grid-cols-4 ${hedvig_sans.className}`}
      >
        <Link
          href="/"
          className="flex items-center justify-center px-4 py-2 md:mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="flex items-center justify-center px-4 py-2 md:mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          About
        </Link>
        <Link
          href="/portfolio"
          className="flex items-center justify-center px-4 py-2 md:mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          Portfolio
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-center px-4 py-2 md:mx-5 text-gray bg-azp-3 rounded-md hover:bg-azp-1"
        >
          Blog
        </Link>
      </div>
    </header>
  );
}

export default Header;
