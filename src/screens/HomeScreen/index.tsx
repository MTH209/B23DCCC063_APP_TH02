import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ThoiTietHienTai from '../../components/ThoiTietHienTai';
import ThoiTietTheoGio from '../../components/ThoiTietTheoGio';
import ThoiTietTheoNgay from '../../components/ThoiTietTheoNgay';
import ChiSoThoiTiet from '../../components/ChiSoThoiTiet';
import CityModal from '../../components/CityModal';
import { LoadingView } from '../../components/WeatherStatus/LoadingView';
import { ErrorView } from '../../components/WeatherStatus/ErrorView';

import { fetchWeather } from '../../services/weatherService';
import {
  getCurrentDeviceLocation,
  DEFAULT_CITY,
} from '../../services/locationService';
import {
  WeatherData,
  HourlyWeather,
  DailyWeather,
  CityPreset,
} from '../../types/weather';

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    cityName: string;
    itemType: 'hour' | 'day';
    hourlyItem?: HourlyWeather;
    dailyItem?: DailyWeather;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [cityModalVisible, setCityModalVisible] = useState<boolean>(false);
  const [permissionNotice, setPermissionNotice] = useState<string | null>(null);

  const [currentCoords, setCurrentCoords] = useState<{
    latitude: number;
    longitude: number;
    cityName: string;
    isGps: boolean;
  }>({
    latitude: DEFAULT_CITY.latitude,
    longitude: DEFAULT_CITY.longitude,
    cityName: DEFAULT_CITY.name,
    isGps: false,
  });

  const loadWeatherData = useCallback(
    async (
      latitude?: number,
      longitude?: number,
      cityName?: string,
      isGps?: boolean
    ) => {
      const lat = latitude ?? currentCoords.latitude;
      const lon = longitude ?? currentCoords.longitude;
      const city = cityName ?? currentCoords.cityName;
      const gps = isGps ?? currentCoords.isGps;

      try {
        setErrorMessage(null);
        const data = await fetchWeather(lat, lon, city, gps);
        setWeather(data);
        setCurrentCoords({ latitude: lat, longitude: lon, cityName: city, isGps: gps });
      } catch (error: any) {
        console.warn('Lỗi khi tải thời tiết:', error);
        setErrorMessage(
          error?.message || 'Không thể kết nối đến máy chủ thời tiết'
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [currentCoords.cityName, currentCoords.isGps, currentCoords.latitude, currentCoords.longitude]
  );

  const handleDetectGpsLocation = useCallback(async () => {
    setLoading(true);
    setPermissionNotice(null);
    try {
      const loc = await getCurrentDeviceLocation();
      if (!loc.permissionGranted && loc.errorMessage) {
        setPermissionNotice(loc.errorMessage);
      } else if (loc.errorMessage) {
        setPermissionNotice(loc.errorMessage);
      }
      await loadWeatherData(
        loc.latitude,
        loc.longitude,
        loc.cityName,
        loc.isGps
      );
    } catch (err) {
      console.warn('GPS detection failed:', err);
      await loadWeatherData(
        DEFAULT_CITY.latitude,
        DEFAULT_CITY.longitude,
        DEFAULT_CITY.name,
        false
      );
    }
  }, [loadWeatherData]);

  useEffect(() => {
    handleDetectGpsLocation();
  }, [handleDetectGpsLocation]);

  const onRefresh = () => {
    setRefreshing(true);
    loadWeatherData();
  };

  const handleSelectCity = (city: CityPreset) => {
    setPermissionNotice(null);
    setLoading(true);
    loadWeatherData(city.latitude, city.longitude, city.name, false);
  };

  const handleSelectHour = (hour: HourlyWeather) => {
    navigation.navigate('Detail', {
      cityName: weather?.city || currentCoords.cityName,
      itemType: 'hour',
      hourlyItem: hour,
    });
  };

  const handleSelectDay = (day: DailyWeather) => {
    navigation.navigate('Detail', {
      cityName: weather?.city || currentCoords.cityName,
      itemType: 'day',
      dailyItem: day,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/images.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          {loading && !weather ? (
            <LoadingView />
          ) : errorMessage && !weather ? (
            <ErrorView
              message={errorMessage}
              onRetry={() => loadWeatherData()}
            />
          ) : (
            <>
              {permissionNotice && (
                <View style={styles.permissionBanner}>
                  <Text style={styles.permissionText}>⚠️ {permissionNotice}</Text>
                  <TouchableOpacity
                    style={styles.permissionRetryBtn}
                    onPress={handleDetectGpsLocation}
                  >
                    <Text style={styles.permissionRetryText}>Bật GPS</Text>
                  </TouchableOpacity>
                </View>
              )}

              <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#FFFFFF"
                    colors={['#60A5FA']}
                  />
                }
              >
                <ThoiTietHienTai
                  tenThanhPho={weather?.city}
                  isGps={weather?.isGpsLocation}
                  nhietDo={weather?.currentTemp}
                  moTa={weather?.currentWeather}
                  icon={weather?.weatherIcon}
                  nhietDoCaoNhat={weather?.highTemp}
                  nhietDoThapNhat={weather?.lowTemp}
                  nhietDoCamNhan={weather?.apparentTemp}
                  onOpenCityPicker={() => setCityModalVisible(true)}
                  onRefreshGps={handleDetectGpsLocation}
                />

                <ThoiTietTheoGio
                  data={weather?.hourly}
                  onSelectHour={handleSelectHour}
                />

                <ThoiTietTheoNgay
                  data={weather?.daily}
                  onSelectDay={handleSelectDay}
                />

                <ChiSoThoiTiet metrics={weather?.metrics} />

                <View style={styles.footer}>
                  <Text style={styles.footerSubText}>
                    Tọa độ: {currentCoords.latitude.toFixed(4)}, {currentCoords.longitude.toFixed(4)}
                  </Text>
                </View>
              </ScrollView>
            </>
          )}

          <CityModal
            visible={cityModalVisible}
            currentCityName={weather?.city || currentCoords.cityName}
            onClose={() => setCityModalVisible(false)}
            onSelectCity={handleSelectCity}
            onUseGps={handleDetectGpsLocation}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  permissionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(234, 179, 8, 0.9)',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  permissionText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  permissionRetryBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  permissionRetryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerSubText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    marginTop: 2,
  },
});

export default HomeScreen;