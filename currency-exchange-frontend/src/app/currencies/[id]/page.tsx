// CurrencyDetail Component - Add class names to style

'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { Currency } from '../../../interfaces';
import styles from './CurrencyDetail.module.css'; // Import the CSS module


const CurrencyDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [currency, setCurrency] = useState<Currency | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCurrency = async () => {
        try {
          const response = await axiosInstance.get(`/currencies/${id}/`);
          setCurrency(response.data);
        } catch (error) {
          console.error('Error fetching currency:', error);
        }
      };
      fetchCurrency();
    }
  }, [id]);

  if (!currency) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={`${styles.currencyDetail} ${styles.container}`}>
      <h1>{currency.name} ({currency.symbol})</h1>
      <p>Exchange Rate: {currency.exchange_rate}</p>
      <p>ID: {currency.id}</p>
    </div>
  );
};

export default CurrencyDetail;
