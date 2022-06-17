import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center h-full w-full container-lg">
      <Link href="/" passHref>
        <a className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          Poké
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
