export interface CurrentLocationWeatherData {
  temp: number;
  feels_like: number;
  name: string;
  country: string;
  icon: string;
  wind: number;
}

export interface WeatherData extends CurrentLocationWeatherData {
  dt: number;
  timezone: number;
  weather_type: string;
}
