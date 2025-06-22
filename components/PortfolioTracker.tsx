'use client';

import React, { useState } from 'react';
import { usePortfolioStore } from './stores/portfolio-store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PortfolioTracker() {
  const { holdings, addHolding, removeHolding } = usePortfolioStore();
  const [ticker, setTicker] = useState('');
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!ticker || !shares || !price) return;
    addHolding({
      ticker: ticker.toUpperCase(),
      shares: Number(shares),
      price: Number(price),
    });
    setTicker('');
    setShares('');
    setPrice('');
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <Input
          placeholder="Shares"
          type="number"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
        />
        <Input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((h) => (
            <TableRow key={h.ticker}>
              <TableCell>{h.ticker}</TableCell>
              <TableCell className="text-right">{h.shares}</TableCell>
              <TableCell className="text-right">{h.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                {(h.shares * h.price).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHolding(h.ticker)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {holdings.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No holdings added.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
