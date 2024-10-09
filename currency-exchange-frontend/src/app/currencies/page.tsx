'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '../../utils/axiosInstance';
import { Currency } from '../../interfaces';
import styles from './Currencies.module.css';

const Currencies: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axiosInstance.get<Currency[]>('/currencies/');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  if (!currencies) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Currencies</h1>
      <ul className={styles.currencyList}>
        {currencies.map((currency) => (
          <li key={currency.id}>
            <Link href={`/currencies/${currency.id}`}>
                {currency.name} ({currency.symbol})
            </Link> - Exchange Rate: {currency.exchange_rate}
          </li>
        ))}
      </ul>
      <Link type="button" className="text-white bg-blue-500 text-lg rounded-lg px-10 py-2.5 dark:focus:ring-gray-700 dark:border-gray-700" href="/new-currency">
        Add New Currency
      </Link>
    </div>
  );
};

export default Currencies;


  