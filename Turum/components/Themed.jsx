import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

// ThemedCard
export const ThemedCard = ({ style, children, ...props }) => {
  const Theme = useTheme()
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
  const Theme = useTheme()
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
export const ThemedView = ({ style, safe = false, showHeader = false, children, ...props }) => {
  const Theme = useTheme()
  if (!safe) return(
    <View
      style={[{
         backgroundColor: Theme.background }, 
         style
        ]}
      {...props}
    >
      {children}
    </View>
  )
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  

  return (
    <View
      style={[{
          backgroundColor: Theme.background,
          paddingTop: headerHeight,
          paddingBottom: insets.bottom, 
        }, 
        style,]}
        {...props}
    >
      {children}
    </View>
  );
};

export const ThemedScrollView = ({
  style,
  contentContainerStyle,
  safe = false,
  showHeader = false,      // if your header overlays content, set this true
  headerIsTransparent = false, // optional: true if header overlaps content
  children,
  ...props
}) => {
  const Theme = useTheme();
  const insets = useSafeAreaInsets();
  let headerHeight = 0;
  try {
    headerHeight = useHeaderHeight?.() ?? 0; // guard if outside navigator
  } catch {
    headerHeight = 0;
  }

  // Compute safe paddings only when requested
  const topPad = safe
    ? (showHeader
        ? (headerIsTransparent ? insets.top + headerHeight : headerHeight)
        : insets.top)
    : 0;

  const bottomPad = safe ? insets.bottom : 0;

  return (
    <ScrollView
      style={[{ backgroundColor: Theme.background }, style]}
      contentContainerStyle={[
        { paddingTop: topPad, paddingBottom: bottomPad },
        contentContainerStyle, // let callers extend/override
      ]}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      {...props}
    >
      {children}
    </ScrollView>
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
