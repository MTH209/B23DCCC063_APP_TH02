import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ErrorViewProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message = 'Đã xảy ra sự cố khi tải dữ liệu thời tiết',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.title}>Không thể tải thời tiết</Text>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onRetry}>
          <Text style={styles.buttonText}>🔄 Thử lại ngay</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    width: '90%',
    maxWidth: 320,
  },
  icon: {
    fontSize: 44,
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    color: '#CBD5E1',
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
