export interface HourlyWeather {
  time: string;
  fullTime: string;
  weatherCode: number;
  weather: string;
  description: string;
  temperature: string;
  tempValue: number;
  apparentTemp: string;
  precipitationProbability: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  visibility: number;
  pressure: number;
}

export interface DailyWeather {
  date: string;
  dayName: string;
  weatherCode: number;
  weather: string;
  description: string;
  tempMin: number;
  tempMax: number;
  tempDisplay: string;
  apparentTempMin: number;
  apparentTempMax: number;
  precipitationProbabilityMax: number;
  precipitationSum: number;
  uvIndexMax: number;
  windSpeedMax: number;
}

export interface WeatherMetrics {
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windDirectionText: string;
  uvIndex: number;
  uvLevel: string;
  precipitation: number;
  surfacePressure: number;
  visibility: number;
  apparentTemperature: number;
}

export interface WeatherData {
  city: string;
  latitude: number;
  longitude: number;
  isGpsLocation: boolean;
  currentTemp: string;
  currentTempValue: number;
  currentWeather: string;
  weatherCode: number;
  weatherIcon: string;
  highTemp: number;
  lowTemp: number;
  apparentTemp: string;
  metrics: WeatherMetrics;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export interface CityPreset {
  name: string;
  latitude: number;
  longitude: number;
  region: string;
}
