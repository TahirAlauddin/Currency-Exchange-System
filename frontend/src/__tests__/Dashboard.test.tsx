// pages/dashboard/Dashboard.test.tsx
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('Dashboard Page', () => {
  it('renders without crashing and displays the heading', async () => {
    // mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<Dashboard />);
    await waitFor(() => expect(screen.getByText('Dashboard')).toBeInTheDocument());
  });
});


screen.debug()