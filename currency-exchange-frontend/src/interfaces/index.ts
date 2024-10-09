// interfaces/index.ts
export interface Transaction {
  id: number;
  transaction_type: string;
  amount: number;
  currency: string;
  timestamp: string;
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  exchange_rate: number;
}
