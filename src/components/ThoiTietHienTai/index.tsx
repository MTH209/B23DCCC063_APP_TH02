import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface ThoiTietHienTaiProps {
  tenThanhPho?: string;
  isGps?: boolean;
  nhietDo?: string;
  moTa?: string;
  icon?: string;
  nhietDoCaoNhat?: number;
  nhietDoThapNhat?: number;
  nhietDoCamNhan?: string;
  onOpenCityPicker?: () => void;
  onRefreshGps?: () => void;
}

const ThoiTietHienTai: React.FC<ThoiTietHienTaiProps> = ({
  tenThanhPho = 'Hà Nội',
  isGps = false,
  nhietDo = '26°C',
  moTa = 'Nhiều mây',
  icon = '⛅',
  nhietDoCaoNhat,
  nhietDoThapNhat,
  nhietDoCamNhan,
  onOpenCityPicker,
  onRefreshGps,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerLocation}>
        <TouchableOpacity
          style={styles.cityBadge}
          activeOpacity={0.7}
          onPress={onOpenCityPicker}
        >
          <Text style={styles.locationPin}>{isGps ? '📍' : '🏙️'}</Text>
          <Text style={styles.tenThanhPho} numberOfLines={1}>
            {tenThanhPho}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {onRefreshGps && (
          <TouchableOpacity
            style={styles.gpsButton}
            activeOpacity={0.7}
            onPress={onRefreshGps}
          >
            <Text style={styles.gpsIconText}>🎯 GPS</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.weatherHero}>
        <Text style={styles.weatherBigIcon}>{icon}</Text>
        <Text style={styles.nhietDo}>{nhietDo}</Text>
      </View>

      <Text style={styles.moTa}>{moTa}</Text>

      <View style={styles.rangeContainer}>
        {nhietDoCaoNhat !== undefined && nhietDoThapNhat !== undefined && (
          <View style={styles.rangePill}>
            <Text style={styles.rangeText}>
              Cao: <Text style={styles.highlightVal}>{nhietDoCaoNhat}°C</Text> • Thấp: <Text style={styles.highlightVal}>{nhietDoThapNhat}°C</Text>
            </Text>
          </View>
        )}

        {nhietDoCamNhan && (
          <View style={styles.feelsLikePill}>
            <Text style={styles.feelsLikeText}>
              Cảm giác như: <Text style={styles.highlightVal}>{nhietDoCamNhan}</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 8,
  },
  cityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  locationPin: {
    fontSize: 16,
    marginRight: 6,
  },
  tenThanhPho: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    maxWidth: 200,
  },
  dropdownIcon: {
    color: '#E0E7FF',
    fontSize: 10,
    marginLeft: 6,
  },
  gpsButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.35)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(147, 197, 253, 0.4)',
  },
  gpsIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  weatherHero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  weatherBigIcon: {
    fontSize: 52,
    marginRight: 10,
  },
  nhietDo: {
    fontSize: 68,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  moTa: {
    fontSize: 20,
    color: '#F3F4F6',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  rangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  rangePill: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  rangeText: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '500',
  },
  feelsLikePill: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  feelsLikeText: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '500',
  },
  highlightVal: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default ThoiTietHienTai;