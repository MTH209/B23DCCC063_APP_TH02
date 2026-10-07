import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HourlyWeather, DailyWeather } from '../../types/weather';
import { getWeatherDescription } from '../../services/weatherService';

export type DetailRouteParams = {
  Detail: {
    cityName: string;
    itemType: 'hour' | 'day';
    hourlyItem?: HourlyWeather;
    dailyItem?: DailyWeather;
  };
};

const DetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<DetailRouteParams, 'Detail'>>();

  const { cityName, itemType, hourlyItem, dailyItem } = route.params || {
    cityName: 'Hà Nội',
    itemType: 'day',
  };

  const isHour = itemType === 'hour' && hourlyItem;
  const weatherCode = isHour
    ? hourlyItem!.weatherCode
    : dailyItem?.weatherCode ?? 0;
  const weatherInfo = getWeatherDescription(weatherCode);

  const titleTime = isHour
    ? `Dự báo lúc ${hourlyItem!.time}`
    : `Dự báo ngày ${dailyItem?.dayName || 'Hôm nay'}`;

  const tempMain = isHour
    ? hourlyItem!.temperature
    : `${dailyItem?.tempMax}°C`;

  const subTemp = isHour
    ? `Cảm giác như: ${hourlyItem!.apparentTemp}`
    : `Thấp nhất: ${dailyItem?.tempMin}°C • Cao nhất: ${dailyItem?.tempMax}°C`;

  const rainProb = isHour
    ? hourlyItem!.precipitationProbability
    : dailyItem?.precipitationProbabilityMax ?? 0;

  const rainSum = isHour
    ? hourlyItem!.precipitation
    : dailyItem?.precipitationSum ?? 0;

  const uvVal = isHour ? hourlyItem!.uvIndex : dailyItem?.uvIndexMax ?? 3;
  const windVal = isHour ? hourlyItem!.windSpeed : dailyItem?.windSpeedMax ?? 10;

  return (
    <ImageBackground
      source={require('../../assets/images/images.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.backText}>‹ Trở về</Text>
            </TouchableOpacity>

            <Text style={styles.cityTitle} numberOfLines={1}>
              {cityName}
            </Text>

            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.heroCard}>
              <Text style={styles.badge}>{isHour ? 'DỰ BÁO THEO GIỜ' : 'DỰ BÁO THEO NGÀY'}</Text>
              <Text style={styles.timeTitle}>{titleTime}</Text>

              <Text style={styles.heroIcon}>{weatherInfo.icon}</Text>
              <Text style={styles.heroTemp}>{tempMain}</Text>
              <Text style={styles.heroDesc}>{weatherInfo.text}</Text>
              <Text style={styles.heroSubTemp}>{subTemp}</Text>

              <View style={styles.adviceBox}>
                <Text style={styles.adviceIcon}>💡 Lời khuyên:</Text>
                <Text style={styles.adviceText}>{weatherInfo.advice}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Chỉ số chi tiết tại thời điểm này</Text>

            <View style={styles.grid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricIcon}>🌧️</Text>
                <Text style={styles.metricLabel}>KHẢ NĂNG MƯA</Text>
                <Text style={styles.metricValue}>{rainProb}%</Text>
                <Text style={styles.metricSub}>Lượng mưa: {rainSum} mm</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricIcon}>☀️</Text>
                <Text style={styles.metricLabel}>CHỈ SỐ UV</Text>
                <Text style={styles.metricValue}>{uvVal}</Text>
                <Text style={styles.metricSub}>
                  {uvVal <= 2 ? 'Mức thấp an toàn' : uvVal <= 5 ? 'Mức trung bình' : 'Mức cao'}
                </Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricIcon}>💨</Text>
                <Text style={styles.metricLabel}>TỐC ĐỘ GIÓ</Text>
                <Text style={styles.metricValue}>{windVal} km/h</Text>
                <Text style={styles.metricSub}>
                  {windVal > 25 ? 'Gió khá mạnh' : 'Gió nhẹ vừa phải'}
                </Text>
              </View>

              {isHour && hourlyItem ? (
                <View style={styles.metricCard}>
                  <Text style={styles.metricIcon}>💧</Text>
                  <Text style={styles.metricLabel}>ĐỘ ẨM KHÔNG KHÍ</Text>
                  <Text style={styles.metricValue}>{hourlyItem.humidity}%</Text>
                  <Text style={styles.metricSub}>
                    {hourlyItem.humidity > 70 ? 'Ẩm ướt cao' : 'Khô thoáng'}
                  </Text>
                </View>
              ) : (
                <View style={styles.metricCard}>
                  <Text style={styles.metricIcon}>🌡️</Text>
                  <Text style={styles.metricLabel}>KHOẢNG CẢM NHẬN</Text>
                  <Text style={styles.metricValue}>
                    {dailyItem?.apparentTempMin}° - {dailyItem?.apparentTempMax}°C
                  </Text>
                  <Text style={styles.metricSub}>Nhiệt độ cơ thể cảm nhận</Text>
                </View>
              )}

              {isHour && hourlyItem && (
                <View style={styles.metricCard}>
                  <Text style={styles.metricIcon}>👁️</Text>
                  <Text style={styles.metricLabel}>TẦM NHÌN XA</Text>
                  <Text style={styles.metricValue}>{hourlyItem.visibility} km</Text>
                  <Text style={styles.metricSub}>Quan sát ngoài trời</Text>
                </View>
              )}

              {isHour && hourlyItem && (
                <View style={styles.metricCard}>
                  <Text style={styles.metricIcon}>⏲️</Text>
                  <Text style={styles.metricLabel}>ÁP SUẤT KHÍ QUYỂN</Text>
                  <Text style={styles.metricValue}>{hourlyItem.pressure} hPa</Text>
                  <Text style={styles.metricSub}>Áp suất mặt đất</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.doneButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.doneButtonText}>Xong</Text>
            </TouchableOpacity>
          </ScrollView>
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
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  backText: {
    color: '#60A5FA',
    fontSize: 18,
    fontWeight: '600',
  },
  cityTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    color: '#DBEAFE',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  timeTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  heroIcon: {
    fontSize: 60,
    marginVertical: 4,
  },
  heroTemp: {
    fontSize: 54,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  heroDesc: {
    fontSize: 18,
    color: '#E2E8F0',
    fontWeight: '600',
    marginVertical: 4,
  },
  heroSubTemp: {
    fontSize: 14,
    color: '#CBD5E1',
    marginTop: 4,
  },
  adviceBox: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    borderLeftWidth: 3,
    borderLeftColor: '#38BDF8',
  },
  adviceIcon: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  adviceText: {
    color: '#F1F5F9',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    padding: 14,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  metricIcon: {
    fontSize: 18,
  },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  metricValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    marginVertical: 2,
  },
  metricSub: {
    fontSize: 11,
    color: '#94A3B8',
  },
  doneButton: {
    marginTop: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DetailScreen;
