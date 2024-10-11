// pages/transactions/[id].tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '../../../utils/axiosInstance';
import { Transaction } from '../../../interfaces';
import styles from './TransactionDetail.module.css';

const TransactionDetail: React.FC = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axiosInstance.get(`/transactions/${id}/`);
        setTransaction(response.data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };

    fetchTransaction();
  }, [id]);

  if (!transaction) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={`${styles.container} ${styles.transactionDetail}`}>
      <h1>Transaction Details</h1>
      <p><strong>Type:</strong> {transaction.transaction_type}</p>
      <p><strong>Amount:</strong> {transaction.amount}</p>
      <p><strong>Currency:</strong> {transaction.currency}</p>
      <p><strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default TransactionDetail;
