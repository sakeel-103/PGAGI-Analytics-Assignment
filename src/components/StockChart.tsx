import React from 'react';

interface StockChartProps {
  data: any;
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Stock Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default StockChart;