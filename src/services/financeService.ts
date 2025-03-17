const fetchFinanceData = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_FINANCE_API_KEY}`
  );
  return response.json();
};

export { fetchFinanceData };
