import { useState, useEffect } from "react";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
  fetchCitySuggestions,
} from "../services/weatherService";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like?: number;
    pressure?: number;
  };
  weather: {
    description: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    humidity: number;
    speed: number;
    weather: {
      main: string;
      description: string;
    }[];
  }[];
}

interface CitySuggestion {
  id: number;
  city: string;
  country: string;
}

const useWeatherData = (city: string) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current weather and forecast
  useEffect(() => {
    const fetchData = async () => {
      if (!city || city.trim().length === 0) {
        setCurrentWeather(null);
        setForecast(null);
        setError("Please enter a valid city name.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const current = await fetchCurrentWeather(city);
        const forecast = await fetchWeatherForecast(city);

        setCurrentWeather(current);
        setForecast(forecast);
      } catch (err: any) {
        setError(err.message || "Failed to fetch weather data.");
        setCurrentWeather(null);
        setForecast(null);
        console.error("Error in weather data fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  // Fetch city suggestions
  const getCitySuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setCitySuggestions([]);
      return;
    }

    try {
      const suggestions = await fetchCitySuggestions(query);
      setCitySuggestions(suggestions);
    } catch (err: any) {
      console.error("Error fetching city suggestions:", err);
      setCitySuggestions([]); // Reset suggestions on error
    }
  };

  // Fetch weather data based on user's geolocation
  const getGeolocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const OPENWEATHERMAP_API_KEY =
              process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

            if (!OPENWEATHERMAP_API_KEY) {
              throw new Error(
                "OpenWeatherMap API key is missing. Please add it to your .env.local file as NEXT_PUBLIC_OPENWEATHERMAP_API_KEY"
              );
            }

            // Get location name from coordinates
            const geoResponse = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`
            );

            if (!geoResponse.ok) {
              throw new Error("Failed to get location name from coordinates.");
            }

            const geoData = await geoResponse.json();

            if (geoData && geoData.length > 0) {
              const locationName = geoData[0].name;

              // Fetch weather data using the location name
              const current = await fetchCurrentWeather(locationName);
              const forecast = await fetchWeatherForecast(locationName);

              setCurrentWeather(current);
              setForecast(forecast);
            } else {
              throw new Error("Unable to determine your location.");
            }
          } catch (err: any) {
            setError(
              err.message || "Failed to fetch weather data using geolocation."
            );
            setCurrentWeather(null);
            setForecast(null);
            console.error("Error in geolocation weather fetching:", err);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError(
            "Geolocation error: " +
              (err.message || "Unable to access your location.")
          );
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  return {
    currentWeather,
    forecast,
    citySuggestions,
    loading,
    error,
    getCitySuggestions,
    getGeolocation,
  };
};

export default useWeatherData;
