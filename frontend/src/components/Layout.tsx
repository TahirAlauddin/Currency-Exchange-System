// components/Layout.tsx

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
