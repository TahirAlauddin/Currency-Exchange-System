// pages/currencies/Currencies.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Currencies from '@/app/currencies/page';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Currencies Page', () => {
  it('displays a list of currencies', async () => {
    const currencies = [
      { id: 1, name: 'US Dollar', symbol: 'USD', exchange_rate: 1.0 },
      { id: 2, name: 'Euro', symbol: 'EUR', exchange_rate: 0.85 },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: currencies });

    render(<Currencies />);

    await waitFor(() => {
      expect(screen.getByText('Currencies')).toBeInTheDocument();
      expect(screen.getByText('US Dollar (USD)')).toBeInTheDocument();
      expect(screen.getByText('Euro (EUR)')).toBeInTheDocument();
    });
  });

  it('shows an error message if fetching currencies fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch currencies'));

    render(<Currencies />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching currencies')).toBeInTheDocument();
    });
  });
});
