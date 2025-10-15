import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../constants/colors';

// ThemedCard
export const ThemedCard = ({ style, children, ...props }) => {
  return (
    <View
      style={[{ backgroundColor: Theme.cardBackground }, styles.card, style]}
      {...props}
    >
      {children}
    </View>
  );
};

// ThemedText
export const ThemedText = ({ style, children, ...props }) => {
  return (
    <Text
      style={[{ color: Theme.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

// ThemedView
export const ThemedView = ({ style, children, ...props }) => {
  return (
    <View
      style={[{ backgroundColor: Theme.background }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // for Android shadows
  },
});
