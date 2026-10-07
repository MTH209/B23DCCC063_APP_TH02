jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn((success) =>
    success({
      coords: {
        latitude: 21.0285,
        longitude: 105.8542,
      },
    })
  ),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        current: {
          temperature_2m: 26,
          relative_humidity_2m: 70,
          apparent_temperature: 28,
          precipitation: 0,
          weather_code: 1,
          surface_pressure: 1012,
          wind_speed_10m: 10,
          wind_direction_10m: 45,
        },
        hourly: {
          time: ['2026-10-07T14:00', '2026-10-07T15:00'],
          temperature_2m: [26, 27],
          relative_humidity_2m: [70, 68],
          apparent_temperature: [28, 29],
          precipitation_probability: [10, 20],
          precipitation: [0, 0],
          weather_code: [1, 2],
          surface_pressure: [1012, 1011],
          visibility: [10000, 10000],
          wind_speed_10m: [10, 12],
          uv_index: [3, 4],
        },
        daily: {
          time: ['2026-10-07'],
          weather_code: [1],
          temperature_2m_max: [30],
          temperature_2m_min: [24],
          apparent_temperature_max: [32],
          apparent_temperature_min: [25],
          precipitation_sum: [0],
          precipitation_probability_max: [10],
          uv_index_max: [6],
          wind_speed_10m_max: [15],
        },
      }),
  })
);
