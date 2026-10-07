import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { POPULAR_CITIES } from '../../services/locationService';
import { CityPreset } from '../../types/weather';

interface CityModalProps {
  visible: boolean;
  currentCityName: string;
  onClose: () => void;
  onSelectCity: (city: CityPreset) => void;
  onUseGps: () => void;
}

const CityModal: React.FC<CityModalProps> = ({
  visible,
  currentCityName,
  onClose,
  onSelectCity,
  onUseGps,
}) => {
  const [query, setQuery] = useState('');

  const filteredCities = POPULAR_CITIES.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Chọn địa điểm</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕ Đóng</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm tỉnh / thành phố..."
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.gpsOption}
            activeOpacity={0.7}
            onPress={() => {
              onUseGps();
              onClose();
            }}
          >
            <Text style={styles.gpsIcon}>📍</Text>
            <View style={styles.gpsInfo}>
              <Text style={styles.gpsTitle}>Sử dụng vị trí GPS hiện tại</Text>
              <Text style={styles.gpsSubtitle}>Tự động nhận diện thời tiết qua vệ tinh</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Các thành phố phổ biến</Text>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {filteredCities.map((city) => {
              const isSelected =
                currentCityName.toLowerCase() === city.name.toLowerCase();
              return (
                <TouchableOpacity
                  key={city.name}
                  style={[styles.cityItem, isSelected && styles.cityItemSelected]}
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                >
                  <View>
                    <Text
                      style={[
                        styles.cityName,
                        isSelected && styles.cityNameSelected,
                      ]}
                    >
                      {city.name}
                    </Text>
                    <Text style={styles.regionName}>{city.region}</Text>
                  </View>
                  {isSelected ? (
                    <Text style={styles.selectedCheck}>✓ Đang chọn</Text>
                  ) : (
                    <Text style={styles.arrowIcon}>›</Text>
                  )}
                </TouchableOpacity>
              );
            })}

            {filteredCities.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không tìm thấy thành phố phù hợp</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  closeBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 14,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  clearText: {
    color: '#94A3B8',
    fontSize: 14,
    paddingHorizontal: 6,
  },
  gpsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: '#3B82F6',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  gpsIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  gpsInfo: {
    flex: 1,
  },
  gpsTitle: {
    color: '#60A5FA',
    fontSize: 15,
    fontWeight: '700',
  },
  gpsSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  list: {
    maxHeight: 340,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 8,
  },
  cityItemSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
    borderColor: '#3B82F6',
    borderWidth: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cityNameSelected: {
    color: '#60A5FA',
  },
  regionName: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  selectedCheck: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '700',
  },
  arrowIcon: {
    color: '#64748B',
    fontSize: 18,
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
});

export default CityModal;
