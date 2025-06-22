import { create } from 'zustand';

export type Holding = {
  ticker: string;
  shares: number;
  price: number;
};

interface PortfolioState {
  holdings: Holding[];
  addHolding: (holding: Holding) => void;
  removeHolding: (ticker: string) => void;
  updateHolding: (holding: Holding) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  holdings: [],
  addHolding: (holding) =>
    set((state) => ({ holdings: [...state.holdings, holding] })),
  removeHolding: (ticker) =>
    set((state) => ({ holdings: state.holdings.filter((h) => h.ticker !== ticker) })),
  updateHolding: (holding) =>
    set((state) => ({
      holdings: state.holdings.map((h) =>
        h.ticker === holding.ticker ? holding : h
      ),
    })),
}));
