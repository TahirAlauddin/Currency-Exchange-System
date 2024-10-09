import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Currency Exchange Dashboard</h1>
      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;