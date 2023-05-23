import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <h1 className="fixed top-4 md:top-7 left-4 md:left-8 z-50">
        <Link
          className="block w-8 md:w-9 h-8 md:h-9 transition-all duration-300 hover:opacity-50"
          href="/"
        >
          <Image src="/logo.png" alt="logo" layout="fill" objectFit="cover" />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
