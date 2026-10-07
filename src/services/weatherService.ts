import {
  WeatherData,
  HourlyWeather,
  DailyWeather,
  WeatherMetrics,
} from '../types/weather';

export type { WeatherData, HourlyWeather, DailyWeather, WeatherMetrics };

export const getWeatherDescription = (
  code: number
): { text: string; icon: string; advice: string } => {
  switch (code) {
    case 0:
      return {
        text: 'Trời quang đãng, nắng đẹp',
        icon: '☀️',
        advice: 'Thời tiết đẹp, thích hợp cho mọi hoạt động ngoài trời!',
      };
    case 1:
      return {
        text: 'Ít mây, nắng nhẹ',
        icon: '🌤️',
        advice: 'Trời hửng nắng dễ chịu, thời tiết thuận lợi.',
      };
    case 2:
      return {
        text: 'Mây rải rác',
        icon: '⛅',
        advice: 'Nắng xen kẽ mây, thời tiết lý tưởng để dạo phố.',
      };
    case 3:
      return {
        text: 'Nhiều mây âm u',
        icon: '☁️',
        advice: 'Trời râm mát nhưng có thể âm u, hãy chuẩn bị ô nếu cần.',
      };
    case 45:
    case 48:
      return {
        text: 'Sương mù dày đặc',
        icon: '🌫️',
        advice: 'Tầm nhìn hạn chế, hãy chú ý cẩn thận khi lái xe!',
      };
    case 51:
    case 53:
    case 55:
      return {
        text: 'Mưa phùn lất phất',
        icon: '🌦️',
        advice: 'Mưa phùn nhẹ hạt, nên mang theo áo mưa nhẹ hoặc ô.',
      };
    case 61:
      return {
        text: 'Mưa nhỏ',
        icon: '🌧️',
        advice: 'Mưa rải rác, nhớ mang theo ô hoặc áo mưa khi ra ngoài.',
      };
    case 63:
    case 65:
      return {
        text: 'Mưa vừa đến to',
        icon: '🌧️',
        advice: 'Mưa khá to, đường có thể trơn trượt ngập úng.',
      };
    case 71:
    case 73:
    case 75:
      return {
        text: 'Tuyết rơi',
        icon: '❄️',
        advice: 'Nhiệt độ rất lạnh, hãy giữ ấm cơ thể cẩn thận.',
      };
    case 80:
    case 81:
    case 82:
      return {
        text: 'Mưa rào từng đợt',
        icon: '🌦️',
        advice: 'Mưa rào bất chợt, đừng quên đem theo dù khi ra ngoài nhé!',
      };
    case 95:
      return {
        text: 'Dông sét',
        icon: '⛈️',
        advice: 'Có dông sét nguy hiểm, hãy tìm nơi trú ẩn an toàn!',
      };
    case 96:
    case 99:
      return {
        text: 'Dông kèm mưa đá',
        icon: '⛈️',
        advice: 'Thời tiết nguy hiểm, hạn chế tối đa ra ngoài trời!',
      };
    default:
      return {
        text: 'Có mây rải rác',
        icon: '⛅',
        advice: 'Thời tiết bình thường, dễ chịu.',
      };
  }
};

export const getWindDirectionText = (degrees: number): string => {
  const directions = [
    'Bắc',
    'Đông Bắc',
    'Đông',
    'Đông Nam',
    'Nam',
    'Tây Nam',
    'Tây',
    'Tây Bắc',
  ];
  const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
  return directions[index];
};

export const getUvLevel = (uv: number): string => {
  if (uv <= 2) return 'Thấp (An toàn)';
  if (uv <= 5) return 'Trung bình';
  if (uv <= 7) return 'Cao (Cần che chắn)';
  if (uv <= 10) return 'Rất cao (Nguy hiểm)';
  return 'Cực độ (Tránh ra ngoài)';
};

const getDayName = (dateStr: string, index: number): string => {
  if (index === 0) return 'Hôm nay';
  const date = new Date(dateStr);
  const day = date.getDay();
  const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const formattedDay = `${date.getDate().toString().padStart(2, '0')}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}`;
  return `${days[day]} (${formattedDay})`;
};

export const fetchWeather = async (
  latitude = 21.0285,
  longitude = 105.8542,
  cityName = 'Hà Nội',
  isGps = false
): Promise<WeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,visibility,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,uv_index_max,wind_speed_10m_max&timezone=Asia%2FBangkok`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra kết nối mạng!');
  }

  const data = await response.json();

  const currentCode = data.current?.weather_code ?? 0;
  const currentWeatherInfo = getWeatherDescription(currentCode);
  const currentTempValue = Math.round(data.current?.temperature_2m ?? 0);
  const currentTemp = `${currentTempValue}°C`;
  const apparentTempNum = Math.round(data.current?.apparent_temperature ?? currentTempValue);
  const apparentTemp = `${apparentTempNum}°C`;

  const windSpeed = Math.round(data.current?.wind_speed_10m ?? 0);
  const windDirection = data.current?.wind_direction_10m ?? 0;
  const humidity = Math.round(data.current?.relative_humidity_2m ?? 0);
  const precipitation = Number((data.current?.precipitation ?? 0).toFixed(1));
  const surfacePressure = Math.round(data.current?.surface_pressure ?? 1013);

  const now = new Date();
  const currentHourStr = now.toISOString().slice(0, 13);
  const hourlyTimes: string[] = data.hourly?.time || [];
  let startIndex = hourlyTimes.findIndex((t) => t.startsWith(currentHourStr));
  if (startIndex === -1) startIndex = 0;

  const hourlyList: HourlyWeather[] = [];
  const maxHourlyItems = Math.min(startIndex + 24, hourlyTimes.length);

  for (let i = startIndex; i < maxHourlyItems; i++) {
    const timeObj = new Date(hourlyTimes[i]);
    const hour = timeObj.getHours();
    const code = data.hourly.weather_code[i];
    const info = getWeatherDescription(code);
    const tempVal = Math.round(data.hourly.temperature_2m[i]);
    const precipProb = Math.round(data.hourly.precipitation_probability?.[i] ?? 0);
    const visibilityKm = Math.round((data.hourly.visibility?.[i] ?? 10000) / 1000);

    hourlyList.push({
      time: `${hour}:00`,
      fullTime: hourlyTimes[i],
      weatherCode: code,
      weather: info.icon,
      description: info.text,
      temperature: `${tempVal}°C`,
      tempValue: tempVal,
      apparentTemp: `${Math.round(data.hourly.apparent_temperature?.[i] ?? tempVal)}°C`,
      precipitationProbability: precipProb,
      precipitation: Number((data.hourly.precipitation?.[i] ?? 0).toFixed(1)),
      humidity: Math.round(data.hourly.relative_humidity_2m?.[i] ?? 0),
      windSpeed: Math.round(data.hourly.wind_speed_10m?.[i] ?? 0),
      uvIndex: Math.round(data.hourly.uv_index?.[i] ?? 0),
      visibility: visibilityKm,
      pressure: Math.round(data.hourly.surface_pressure?.[i] ?? 1013),
    });
  }

  const currentHourUv = hourlyList.length > 0 ? hourlyList[0].uvIndex : 3;
  const currentVisibility = hourlyList.length > 0 ? hourlyList[0].visibility : 10;

  const dailyDates: string[] = data.daily?.time || [];
  const dailyList: DailyWeather[] = dailyDates.map((dateStr, index) => {
    const code = data.daily.weather_code[index];
    const info = getWeatherDescription(code);
    const minTemp = Math.round(data.daily.temperature_2m_min[index]);
    const maxTemp = Math.round(data.daily.temperature_2m_max[index]);
    const apparentMin = Math.round(data.daily.apparent_temperature_min?.[index] ?? minTemp);
    const apparentMax = Math.round(data.daily.apparent_temperature_max?.[index] ?? maxTemp);
    const rainProb = Math.round(data.daily.precipitation_probability_max?.[index] ?? 0);
    const rainSum = Number((data.daily.precipitation_sum?.[index] ?? 0).toFixed(1));
    const uvMax = Math.round(data.daily.uv_index_max?.[index] ?? 5);
    const windMax = Math.round(data.daily.wind_speed_10m_max?.[index] ?? 15);

    return {
      date: dateStr,
      dayName: getDayName(dateStr, index),
      weatherCode: code,
      weather: info.icon,
      description: info.text,
      tempMin: minTemp,
      tempMax: maxTemp,
      tempDisplay: `${minTemp}° - ${maxTemp}°C`,
      apparentTempMin: apparentMin,
      apparentTempMax: apparentMax,
      precipitationProbabilityMax: rainProb,
      precipitationSum: rainSum,
      uvIndexMax: uvMax,
      windSpeedMax: windMax,
    };
  });

  const highTemp = dailyList.length > 0 ? dailyList[0].tempMax : currentTempValue + 2;
  const lowTemp = dailyList.length > 0 ? dailyList[0].tempMin : currentTempValue - 3;

  const metrics: WeatherMetrics = {
    humidity,
    windSpeed,
    windDirection,
    windDirectionText: getWindDirectionText(windDirection),
    uvIndex: currentHourUv,
    uvLevel: getUvLevel(currentHourUv),
    precipitation,
    surfacePressure,
    visibility: currentVisibility,
    apparentTemperature: apparentTempNum,
  };

  return {
    city: cityName,
    latitude,
    longitude,
    isGpsLocation: isGps,
    currentTemp,
    currentTempValue,
    currentWeather: currentWeatherInfo.text,
    weatherCode: currentCode,
    weatherIcon: currentWeatherInfo.icon,
    highTemp,
    lowTemp,
    apparentTemp,
    metrics,
    hourly: hourlyList,
    daily: dailyList,
  };
};
