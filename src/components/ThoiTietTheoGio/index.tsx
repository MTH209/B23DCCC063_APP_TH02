import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { HourlyWeather } from '../../types/weather';

interface ThoiTietTheoGioProps {
  data?: HourlyWeather[];
  onSelectHour?: (hour: HourlyWeather) => void;
}

const ThoiTietTheoGio: React.FC<ThoiTietTheoGioProps> = ({ data = [], onSelectHour }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerTitleRow}>
        <Text style={styles.headerTitle}>⏱️ DỰ BÁO 24 GIỜ TỚI</Text>
        <Text style={styles.headerSubtitle}>Chạm để xem chi tiết</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {data.map((item, index) => {
          const hasRainChance = item.precipitationProbability > 0;
          return (
            <TouchableOpacity
              key={`${item.time}-${index}`}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => onSelectHour?.(item)}
            >
              <Text style={styles.time}>{index === 0 ? 'Hiện tại' : item.time}</Text>

              <Text style={styles.weatherIcon}>{item.weather}</Text>

              <View style={styles.rainChanceContainer}>
                {hasRainChance ? (
                  <Text style={styles.rainProbText}>{item.precipitationProbability}%</Text>
                ) : (
                  <Text style={styles.rainProbPlaceholder}>-</Text>
                )}
              </View>

              <Text style={styles.temperature}>{item.temperature}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  headerTitle: {
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
  container: {
    paddingHorizontal: 16,
    gap: 8,
  },
  card: {
    width: 68,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  weatherIcon: {
    fontSize: 22,
    marginVertical: 2,
  },
  rainChanceContainer: {
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  rainProbText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#60A5FA',
  },
  rainProbPlaceholder: {
    fontSize: 10,
    color: 'transparent',
  },
  temperature: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ThoiTietTheoGio;