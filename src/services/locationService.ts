import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { CityPreset } from '../types/weather';

export const POPULAR_CITIES: CityPreset[] = [
  { name: 'Hà Nội', latitude: 21.0285, longitude: 105.8542, region: 'Miền Bắc' },
  { name: 'TP. Hồ Chí Minh', latitude: 10.8231, longitude: 106.6297, region: 'Miền Nam' },
  { name: 'Đà Nẵng', latitude: 16.0544, longitude: 108.2022, region: 'Miền Trung' },
  { name: 'Hải Phòng', latitude: 20.8449, longitude: 106.6881, region: 'Miền Bắc' },
  { name: 'Cần Thơ', latitude: 10.0452, longitude: 105.7469, region: 'Miền Tây' },
  { name: 'Nha Trang', latitude: 12.2388, longitude: 109.1967, region: 'Miền Trung' },
  { name: 'Đà Lạt', latitude: 11.9404, longitude: 108.4583, region: 'Tây Nguyên' },
  { name: 'Huế', latitude: 16.4637, longitude: 107.5909, region: 'Miền Trung' },
  { name: 'Hạ Long', latitude: 20.9505, longitude: 107.0734, region: 'Miền Bắc' },
  { name: 'Sa Pa', latitude: 22.3364, longitude: 103.8438, region: 'Tây Bắc' },
  { name: 'Vũng Tàu', latitude: 10.3460, longitude: 107.0843, region: 'Đông Nam Bộ' },
  { name: 'Quy Nhơn', latitude: 13.7830, longitude: 109.2197, region: 'Miền Trung' },
];

export const DEFAULT_CITY = POPULAR_CITIES[0];

export interface LocationResult {
  latitude: number;
  longitude: number;
  cityName: string;
  isGps: boolean;
  permissionGranted: boolean;
  errorMessage?: string;
}

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Quyền truy cập vị trí',
        message: 'Ứng dụng cần quyền vị trí để dự báo thời tiết chính xác tại nơi bạn đang ở.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Từ chối',
        buttonPositive: 'Đồng ý',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Lỗi khi xin quyền vị trí:', err);
    return false;
  }
};

export const reverseGeocodeCity = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`
    );
    if (response.ok) {
      const data = await response.json();
      const city = data.city || data.locality || data.principalSubdivision;
      if (city) {
        return city;
      }
    }
  } catch (error) {
    console.warn('Reverse geocode error:', error);
  }

  let closest = DEFAULT_CITY;
  let minDistance = Number.MAX_VALUE;
  for (const city of POPULAR_CITIES) {
    const dist = Math.hypot(city.latitude - latitude, city.longitude - longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = city;
    }
  }
  return closest.name;
};

export const getCurrentDeviceLocation = async (): Promise<LocationResult> => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    return {
      latitude: DEFAULT_CITY.latitude,
      longitude: DEFAULT_CITY.longitude,
      cityName: DEFAULT_CITY.name,
      isGps: false,
      permissionGranted: false,
      errorMessage: 'Chưa cấp quyền vị trí. Đang hiển thị mặc định tại Hà Nội.',
    };
  }

  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const cityName = await reverseGeocodeCity(latitude, longitude);
        resolve({
          latitude,
          longitude,
          cityName: cityName || 'Vị trí hiện tại',
          isGps: true,
          permissionGranted: true,
        });
      },
      (error) => {
        console.warn('Geolocation error:', error);
        resolve({
          latitude: DEFAULT_CITY.latitude,
          longitude: DEFAULT_CITY.longitude,
          cityName: DEFAULT_CITY.name,
          isGps: false,
          permissionGranted: true,
          errorMessage: 'Không thể lấy tín hiệu GPS. Đang hiển thị mặc định tại Hà Nội.',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};
