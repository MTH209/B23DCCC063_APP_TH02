import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherMetrics } from '../../types/weather';

interface ChiSoThoiTietProps {
  metrics?: WeatherMetrics;
}

const ChiSoThoiTiet: React.FC<ChiSoThoiTietProps> = ({ metrics }) => {
  if (!metrics) {
    return null;
  }

  const getHumidityDesc = (val: number) => {
    if (val < 40) return 'Khô ráo';
    if (val < 70) return 'Dễ chịu';
    return 'Độ ẩm cao';
  };

  const getVisibilityDesc = (val: number) => {
    if (val >= 10) return 'Tầm nhìn rất rõ';
    if (val >= 5) return 'Tầm nhìn tốt';
    return 'Tầm nhìn hạn chế';
  };

  const getPressureDesc = (val: number) => {
    if (val > 1015) return 'Áp suất cao';
    if (val >= 1000) return 'Áp suất chuẩn';
    return 'Áp suất thấp';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>📊 CÁC CHỈ SỐ THỜI TIẾT CHI TIẾT</Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>💧</Text>
            <Text style={styles.cardTitle}>ĐỘ ẨM</Text>
          </View>
          <Text style={styles.cardValue}>{metrics.humidity}%</Text>
          <Text style={styles.cardDesc}>{getHumidityDesc(metrics.humidity)}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>💨</Text>
            <Text style={styles.cardTitle}>TỐC ĐỘ GIÓ</Text>
          </View>
          <Text style={styles.cardValue}>{metrics.windSpeed} km/h</Text>
          <Text style={styles.cardDesc}>
            Hướng: <Text style={styles.cardHighlight}>{metrics.windDirectionText}</Text> ({metrics.windDirection}°)
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>☀️</Text>
            <Text style={styles.cardTitle}>CHỈ SỐ UV</Text>
          </View>
          <Text style={styles.cardValue}>{metrics.uvIndex}</Text>
          <Text style={styles.cardDesc}>{metrics.uvLevel}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🌧️</Text>
            <Text style={styles.cardTitle}>LƯỢNG MƯA</Text>
          </View>
          <Text style={styles.cardValue}>{metrics.precipitation} mm</Text>
          <Text style={styles.cardDesc}>
            {metrics.precipitation > 0 ? 'Có mưa trong giờ qua' : 'Không mưa'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>⏲️</Text>
            <Text style={styles.cardTitle}>ÁP SUẤT</Text>
          </View>
          <Text style={styles.cardValue}>{metrics.surfacePressure} hPa</Text>
          <Text style={styles.cardDesc}>{getPressureDesc(metrics.surfacePressure)}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>👁️</Text>
            <Text style={styles.cardTitle}>TẦM NHÌN</Text>
          </View>
          <Text style={styles.cardValue}>{metrics.visibility} km</Text>
          <Text style={styles.cardDesc}>{getVisibilityDesc(metrics.visibility)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    padding: 12,
    minHeight: 105,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardIcon: {
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.75)',
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 14,
  },
  cardHighlight: {
    color: '#93C5FD',
    fontWeight: '600',
  },
});

export default ChiSoThoiTiet;
