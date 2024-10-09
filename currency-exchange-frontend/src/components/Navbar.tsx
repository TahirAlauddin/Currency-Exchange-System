// components/Navbar.tsx

import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <h1>Currency Exchange</h1>
      <div className={styles.navLinks}>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="/currencies">
          Currencies
        </Link>
        <Link href="/transactions">
          Transactions
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
