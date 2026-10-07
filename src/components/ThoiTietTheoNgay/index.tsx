import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DailyWeather } from '../../types/weather';

interface ThoiTietTheoNgayProps {
  data?: DailyWeather[];
  onSelectDay?: (day: DailyWeather) => void;
}

const ThoiTietTheoNgay: React.FC<ThoiTietTheoNgayProps> = ({ data = [], onSelectDay }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleRow}>
        <Text style={styles.title}>📅 DỰ BÁO 7 NGÀY TỚI</Text>
        <Text style={styles.headerSubtitle}>Nhấn để xem chi tiết</Text>
      </View>

      <View style={styles.cardContainer}>
        {data.map((item, index) => {
          const hasRain = item.precipitationProbabilityMax > 0;
          return (
            <TouchableOpacity
              key={`${item.date}-${index}`}
              style={[styles.row, index === data.length - 1 && styles.lastRow]}
              activeOpacity={0.7}
              onPress={() => onSelectDay?.(item)}
            >
              <View style={styles.dayCol}>
                <Text style={styles.dayName}>{item.dayName}</Text>
              </View>

              <View style={styles.weatherCol}>
                <Text style={styles.weatherIcon}>{item.weather}</Text>
                {hasRain ? (
                  <Text style={styles.rainChance}>💧 {item.precipitationProbabilityMax}%</Text>
                ) : (
                  <Text style={styles.noRainText}>Tạnh ráo</Text>
                )}
              </View>

              <View style={styles.tempCol}>
                <Text style={styles.minTemp}>{item.tempMin}°</Text>
                <View style={styles.tempBarTrack}>
                  <View style={styles.tempBarFill} />
                </View>
                <Text style={styles.maxTemp}>{item.tempMax}°C</Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  dayCol: {
    width: '32%',
  },
  dayName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  weatherCol: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    gap: 6,
  },
  weatherIcon: {
    fontSize: 18,
  },
  rainChance: {
    fontSize: 11,
    color: '#60A5FA',
    fontWeight: '700',
  },
  noRainText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tempCol: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    justifyContent: 'flex-end',
    gap: 6,
  },
  minTemp: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    width: 22,
    textAlign: 'right',
  },
  tempBarTrack: {
    width: 38,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  tempBarFill: {
    width: '80%',
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    alignSelf: 'center',
  },
  maxTemp: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
    width: 32,
    textAlign: 'left',
  },
  chevron: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginLeft: 4,
  },
});

export default ThoiTietTheoNgay;