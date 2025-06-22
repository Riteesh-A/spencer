import React from 'react';
import PortfolioTracker from '@/components/PortfolioTracker';

export default function PortfolioPage() {
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4 font-inter">Stock Portfolio</h1>
      <PortfolioTracker />
    </div>
  );
}
