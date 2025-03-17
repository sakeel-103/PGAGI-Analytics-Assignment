const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const GEODB_CITIES_API_KEY = process.env.NEXT_PUBLIC_GEODB_CITIES_API_KEY;

export const fetchCurrentWeather = async (city: string) => {
  try {
    if (!city) {
      throw new Error("City name is required.");
    }

    if (!OPENWEATHERMAP_API_KEY) {
      console.error("OpenWeatherMap API key is missing.");
      throw new Error(
        "OpenWeatherMap API key is missing. Please add it to your .env.local file as NEXT_PUBLIC_OPENWEATHERMAP_API_KEY"
      );
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    console.log("Fetching current weather from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);

      if (response.status === 404) {
        throw new Error(
          "City not found. Please check the spelling and try again."
        );
      } else {
        throw new Error(
          errorData.message || "Failed to fetch current weather data."
        );
      }
    }

    const data = await response.json();
    console.log("API Response Data:", data);
    return data;
  } catch (error: any) {
    console.error("Error fetching current weather data:", error);
    throw error;
  }
};

export const fetchWeatherForecast = async (city: string) => {
  try {
    if (!city) {
      throw new Error("City name is required.");
    }

    if (!OPENWEATHERMAP_API_KEY) {
      console.error("OpenWeatherMap API key is missing.");
      throw new Error(
        "OpenWeatherMap API key is missing. Please add it to your .env.local file as NEXT_PUBLIC_OPENWEATHERMAP_API_KEY"
      );
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);

      throw new Error(errorData.message || "Failed to fetch weather forecast.");
    }

    const hourlyData = await response.json();

    const dailyData = transformHourlyToDaily(hourlyData);
    return dailyData;
  } catch (error: any) {
    console.error("Error fetching weather forecast:", error);
    throw error;
  }
};

const transformHourlyToDaily = (hourlyData: any) => {
  const dailyMap = new Map();

  hourlyData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split("T")[0];

    if (!dailyMap.has(dateStr)) {
      dailyMap.set(dateStr, {
        dt: item.dt,
        temp: {
          day: item.main.temp,
          min: item.main.temp_min,
          max: item.main.temp_max,
        },
        humidity: item.main.humidity,
        speed: item.wind.speed,
        weather: item.weather,
      });
    } else {
      const existing = dailyMap.get(dateStr);
      existing.temp.min = Math.min(existing.temp.min, item.main.temp_min);
      existing.temp.max = Math.max(existing.temp.max, item.main.temp_max);

      if (date.getHours() >= 12 && date.getHours() <= 15) {
        existing.temp.day = item.main.temp;
      }
    }
  });

  return {
    city: hourlyData.city,
    list: Array.from(dailyMap.values()).slice(0, 7),
  };
};

export const fetchCitySuggestions = async (query: string) => {
  try {
    if (!query || query.length < 2) {
      return [];
    }

    if (!GEODB_CITIES_API_KEY) {
      console.error("GeoDB Cities API key is missing.");
      return [{ id: 1, city: query, country: "Unknown" }];
    }

    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
        query
      )}&limit=5`,
      {
        headers: {
          "x-rapidapi-key": GEODB_CITIES_API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);

      throw new Error(errorData.message || "Failed to fetch city suggestions.");
    }

    const data = await response.json();

    return data.data.map((city: any) => ({
      id: city.id,
      city: city.name,
      country: city.country,
    }));
  } catch (error: any) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
