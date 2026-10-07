import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingViewProps {
  message?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
  message = 'Đang cập nhật dữ liệu thời tiết...',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text style={styles.title}>{message}</Text>
        <Text style={styles.subtitle}>Đang kết nối đến trạm khí tượng vệ tinh...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    width: '90%',
    maxWidth: 320,
  },
  title: {
    marginTop: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
});
