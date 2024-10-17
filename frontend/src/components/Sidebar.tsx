// components/Sidebar.tsx

import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/currencies">
            Currencies
          </Link>
        </li>
        <li>
          <Link href="/transactions">
            Transactions
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
