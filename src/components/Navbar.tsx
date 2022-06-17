import Link from 'next/link';
import { AiOutlineMenu, AiOutlineArrowRight } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

type Props = {};

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Pokemon',
    href: '/pokemon'
  },
  {
    label: 'Type',
    href: '/type'
  }
];

const Navbar = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center h-full w-full container-lg">
      <Link href="/" passHref>
        <a className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mr-auto">
          Poké
        </a>
      </Link>

      <div className="gap-4 hidden sm:flex">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <a className="hover:text-blue-500">{item.label}</a>
          </Link>
        ))}
      </div>

      <div className="block sm:hidden">
        <button
          className="text-xl items-center flex"
          onClick={() => setOpen(true)}
        >
          <AiOutlineMenu />
        </button>

        <MobileDrawer isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileDrawer = ({ isOpen, onClose }: DrawerProps) => {
  return (
    <div
      className={`fixed left-0 top-0 w-[100vw] z-20 h-[100vh] bg-white ${
        isOpen ? 'flex' : 'hidden'
      } flex-col items-center px-4 py-2 gap-4`}
    >
      <button onClick={onClose} className="ml-auto text-2xl">
        <FaTimes />
      </button>
      <h1 className="font-bold text-2xl text-blue-500 mx-auto">Poké</h1>

      <div className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <Link href={item.href} key={item.href} passHref>
            <a className="text-xl flex gap-2 items-center">
              {item.label}
              <AiOutlineArrowRight />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
