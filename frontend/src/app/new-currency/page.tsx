'use client';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/navigation';

const NewCurrency: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const router = useRouter();

  const handleCurrencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/currencies/', {
        name: name,
        symbol: symbol,
        exchange_rate: exchangeRate,
      });
      router.push('/dashboard'); // Redirect to dashboard after adding currency
    } catch (error) {
      console.error('Error adding currency:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add New Currency</h1>
      <form onSubmit={handleCurrencySubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Currency Name"
        />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Currency Symbol"
        />
        <input
          type="number"
          value={exchangeRate}
          onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
          placeholder="Exchange Rate"
        />
        <button type="submit">Add Currency</button>
      </form>
    </div>
  );
};

export default NewCurrency;
