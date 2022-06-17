import Navbar from '../components/Navbar';
import Head from 'next/head';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Poké</title>
      </Head>
      <div>
        <header className="fixed top-0 h-14 bg-white w-full shadow-sm z-10">
          <Navbar />
        </header>
        <main className="mt-14 container-lg">{children}</main>
      </div>
    </>
  );
};

export default Layout;
