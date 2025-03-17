const fetchNewsData = async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "News API key is missing. Please add NEXT_PUBLIC_NEWS_API_KEY to your environment variables."
    );
  }

  try {
    // For development with free tier, use a free tier compatible endpoint
    // The free NewsAPI plan only allows requests from localhost
    const url = `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&apiKey=${apiKey}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store", // Disable caching to ensure fresh data
    });

    if (!response.ok) {
      // Try to get more detailed error information
      const errorData = await response.text();
      console.error("API Error Response:", errorData);

      // Special handling for 401 errors
      if (response.status === 401) {
        throw new Error(
          "API Key unauthorized. Please check your NewsAPI key and account status."
        );
      }

      throw new Error(
        `API responded with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

// Fallback function that returns mock data if the API call fails
// This is useful during development or when the API is unavailable
const getMockNewsData = () => {
  return {
    status: "ok",
    articles: [
      {
        source: { id: "mock-source", name: "Tech News" },
        author: "John Doe",
        title: "Latest Technology Trends 2025",
        description:
          "A look at the emerging technology trends that will shape our future.",
        url: "https://example.com/tech-trends",
        urlToImage:
          "https://via.placeholder.com/600x400?text=Technology+Trends",
        publishedAt: new Date().toISOString(),
        content: "Technology continues to evolve at a rapid pace...",
      },
      {
        source: { id: "mock-source", name: "Science Daily" },
        author: "Jane Smith",
        title: "Breakthrough in Quantum Computing",
        description:
          "Scientists have achieved a major milestone in quantum computing research.",
        url: "https://example.com/quantum-computing",
        urlToImage:
          "https://via.placeholder.com/600x400?text=Quantum+Computing",
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        content: "Quantum computing has taken a significant leap forward...",
      },
    ],
  };
};

export { fetchNewsData, getMockNewsData };
