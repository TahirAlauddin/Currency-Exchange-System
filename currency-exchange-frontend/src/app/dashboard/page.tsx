'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Transaction, Currency } from '../../interfaces';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [transactionType, setTransactionType] = useState<string>('buy');
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, currenciesRes] = await Promise.all([
          axiosInstance.get<Transaction[]>('/transactions/'),
          axiosInstance.get<Currency[]>('/currencies/'),
        ]);
        setTransactions(transactionsRes.data);
        setCurrencies(currenciesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/transactions/', {
        transaction_type: transactionType,
        amount: amount,
        currency: currency,
      });
      setTransactionType('buy');
      setAmount(0);
      setCurrency('');
      const transactionsRes = await axiosInstance.get<Transaction[]>('/transactions/');
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <section>
        <h2>Create Transaction</h2>
        <form onSubmit={handleTransactionSubmit}>
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Amount"
          />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="">Select Currency</option>
            {currencies.map((cur) => (
              <option key={cur.id} value={cur.name}>{cur.name}</option>
            ))}
          </select>
          <button type="submit">Add Transaction</button>
        </form>
      </section>

      <section>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.transaction_type} - {transaction.amount} {transaction.currency}
            </li>
          ))}
          
        
        </ul>
      </section>

      <section>
        <h2>Currencies</h2>
        <ul>
        {currencies.map((currency) => (
          <li key={currency.id}>
            <Link href={`/currencies/${currency.id}`}>
              {currency.name} ({currency.symbol})
            </Link> - Exchange Rate: {currency.exchange_rate}
          </li>
        ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
