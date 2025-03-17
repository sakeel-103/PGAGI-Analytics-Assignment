"use client";

import React, { useState, useEffect } from "react";
import useWeatherData from "../../hooks/useWeatherData";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { currentWeather, forecast, citySuggestions, loading, error, getCitySuggestions, getGeolocation } =
    useWeatherData(selectedCity);

  useEffect(() => {
    getGeolocation(); // Fetch weather data based on user's location on page load
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getCitySuggestions(city);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setSelectedCity(selectedCity);
  };

  // Format forecast data for chart
  const formatForecastData = () => {
    if (!forecast?.list) return [];
    
    return forecast.list.map((day) => ({
      date: new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      high: day.temp.max,
      low: day.temp.min,
      humidity: day.humidity,
      windSpeed: day.speed,
      condition: day.weather[0].main
    }));
  };

  const forecastData = formatForecastData();

  if (loading) return <div style={styles.loading}>Loading weather data...</div>;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarLogo}>
          <Link href="/" style={styles.navbarLink}>
            PGAGI Analytics
          </Link>
        </div>
        <div style={styles.navbarLinks}>
          <Link href="/" style={styles.navbarLink}>
            Home
          </Link>
          <Link href="/weather" style={styles.navbarLink}>
            Weather
          </Link>
          <Link href="/news" style={styles.navbarLink}>
            News
          </Link>
          <Link href="/finance" style={styles.navbarLink}>
            Finance
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h1 style={styles.header}>Weather Dashboard</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
          <button 
            type="button" 
            onClick={getGeolocation}
            style={styles.locationButton}
          >
            Use My Location
          </button>
        </form>

        {/* Display City Suggestions */}
        <ul style={styles.suggestionsList}>
  {citySuggestions.map((suggestion) => (
    <li
      key={suggestion.id}
      onClick={() => handleCitySelect(suggestion.city)}
      style={{
        ...styles.suggestionItem,
        ...(city === suggestion.city ? styles.suggestionItemHover : {}),
      }}
    >
      {suggestion.city}, {suggestion.country}
    </li>
  ))}
</ul>

        {/* Error Message */}
        {error && <div style={styles.errorMessage}>{error}</div>}

        {/* Display Current Weather */}
        {currentWeather && (
          <div style={styles.weatherBox}>
            <h2 style={styles.weatherHeader}>Current Weather in {currentWeather.name}</h2>
            <div style={styles.weatherDetails}>
              <div style={styles.weatherMainInfo}>
                <div style={styles.temperature}>{Math.round(currentWeather.main.temp)}°C</div>
                <div style={styles.weatherDescription}>
                  {currentWeather.weather[0].description}
                </div>
              </div>
              <div style={styles.weatherInfoGrid}>
                <div style={styles.weatherInfoItem}>
                  <span style={styles.weatherInfoLabel}>Humidity</span>
                  <span style={styles.weatherInfoValue}>{currentWeather.main.humidity}%</span>
                </div>
                <div style={styles.weatherInfoItem}>
                  <span style={styles.weatherInfoLabel}>Wind Speed</span>
                  <span style={styles.weatherInfoValue}>{currentWeather.wind.speed} m/s</span>
                </div>
                {currentWeather.main.feels_like && (
                  <div style={styles.weatherInfoItem}>
                    <span style={styles.weatherInfoLabel}>Feels Like</span>
                    <span style={styles.weatherInfoValue}>{Math.round(currentWeather.main.feels_like)}°C</span>
                  </div>
                )}
                {currentWeather.main.pressure && (
                  <div style={styles.weatherInfoItem}>
                    <span style={styles.weatherInfoLabel}>Pressure</span>
                    <span style={styles.weatherInfoValue}>{currentWeather.main.pressure} hPa</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Display 7-Day Forecast */}
        {forecast && forecast.list && forecast.list.length > 0 && (
          <div style={styles.forecastBox}>
            <h2 style={styles.forecastHeader}>7-Day Forecast</h2>
            
            {/* Temperature Chart */}
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" unit="°C" orientation="left" />
                  <YAxis yAxisId="right" unit="%" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="high" 
                    name="High Temp" 
                    stroke="#FF8042" 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="low" 
                    name="Low Temp" 
                    stroke="#0088FE" 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="humidity" 
                    name="Humidity" 
                    stroke="#00C49F" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Daily Forecast Cards */}
            <div style={styles.forecastCards}>
              {forecastData.map((day, index) => (
                <div key={index} style={styles.forecastCard}>
                  <h3 style={styles.forecastDay}>{day.date}</h3>
                  <p style={styles.forecastCondition}>{day.condition}</p>
                  <div style={styles.forecastTemps}>
                    <span style={styles.forecastHighTemp}>{Math.round(day.high)}°</span>
                    <span style={styles.forecastLowTemp}>{Math.round(day.low)}°</span>
                  </div>
                  <div style={styles.forecastDetail}>
                    <span style={styles.forecastDetailLabel}>Humidity:</span>
                    <span style={styles.forecastDetailValue}>{day.humidity}%</span>
                  </div>
                  <div style={styles.forecastDetail}>
                    <span style={styles.forecastDetailLabel}>Wind:</span>
                    <span style={styles.forecastDetailValue}>{day.windSpeed} m/s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherPage;

// CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    fontFamily: "Arial, sans-serif",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
  },
  navbarLogo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navbarLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  navbarLink: {
    color: "#fff",
    textDecoration: "none",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "2rem",
  },
  header: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "2rem",
  },
  searchForm: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  searchInput: {
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "300px",
    fontSize: "1rem",
  },
  searchButton: {
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  locationButton: {
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    color: "#007bff",
  },
  errorMessage: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  suggestionsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "300px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: "200px",
    overflowY: "auto",
    position: "absolute" as const,
    zIndex: 10,
    marginTop: "0.5rem", // Add some spacing below the search bar
  },
  suggestionItem: {
    padding: "0.75rem",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s ease", // Add hover effect
  },
  suggestionItemHover: {
    backgroundColor: "#f0f4f8", // Light background on hover
  },
  weatherBox: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    width: "100%",
    maxWidth: "800px",
    marginBottom: "2rem",
  },
  weatherHeader: {
    fontSize: "1.75rem",
    color: "#007bff",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
  },
  weatherDetails: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  weatherMainInfo: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  temperature: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  weatherDescription: {
    fontSize: "1.5rem",
    color: "#666",
    textTransform: "capitalize" as const,
  },
  weatherInfoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1rem",
    width: "100%",
  },
  weatherInfoItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "0.75rem",
    backgroundColor: "#f0f4f8",
    borderRadius: "4px",
  },
  weatherInfoLabel: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "0.25rem",
  },
  weatherInfoValue: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },
  forecastBox: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    width: "100%",
    maxWidth: "1000px",
  },
  forecastHeader: {
    fontSize: "1.75rem",
    color: "#007bff",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
  },
  chartContainer: {
    marginBottom: "2rem",
    width: "100%",
  },
  forecastCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  forecastCard: {
    backgroundColor: "#f0f4f8",
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  forecastDay: {
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "0.5rem",
  },
  forecastCondition: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "0.5rem",
    textTransform: "capitalize" as const,
  },
  forecastTemps: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },
  forecastHighTemp: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#FF8042",
  },
  forecastLowTemp: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#0088FE",
  },
  forecastDetail: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "0.9rem",
    marginTop: "0.25rem",
  },
  forecastDetailLabel: {
    color: "#666",
  },
  forecastDetailValue: {
    color: "#333",
    fontWeight: "bold",
  },
}; 