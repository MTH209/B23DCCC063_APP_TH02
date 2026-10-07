import {
  getWeatherDescription,
  getWindDirectionText,
  getUvLevel,
  fetchWeather,
} from '../src/services/weatherService';

describe('weatherService', () => {
  test('getWeatherDescription returns correct description and icon', () => {
    const sunny = getWeatherDescription(0);
    expect(sunny.icon).toBe('☀️');
    expect(sunny.text).toContain('nắng');

    const rain = getWeatherDescription(61);
    expect(rain.icon).toBe('🌧️');

    const thunderstorm = getWeatherDescription(95);
    expect(thunderstorm.icon).toBe('⛈️');
  });

  test('getWindDirectionText calculates direction accurately', () => {
    expect(getWindDirectionText(0)).toBe('Bắc');
    expect(getWindDirectionText(90)).toBe('Đông');
    expect(getWindDirectionText(180)).toBe('Nam');
    expect(getWindDirectionText(270)).toBe('Tây');
  });

  test('getUvLevel evaluates UV categories correctly', () => {
    expect(getUvLevel(1)).toContain('Thấp');
    expect(getUvLevel(4)).toContain('Trung bình');
    expect(getUvLevel(7)).toContain('Cao');
    expect(getUvLevel(9)).toContain('Rất cao');
  });

  test('fetchWeather fetches and transforms real API data properly', async () => {
    const data = await fetchWeather(21.0285, 105.8542, 'Hà Nội', false);
    expect(data.city).toBe('Hà Nội');
    expect(data.currentTemp).toBe('26°C');
    expect(data.metrics.humidity).toBe(70);
    expect(data.hourly.length).toBeGreaterThan(0);
    expect(data.daily.length).toBeGreaterThan(0);
  });
});
