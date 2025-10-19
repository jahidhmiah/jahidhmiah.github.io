import { useColorScheme } from 'react-native';

export const Colors = {
  // Primary Pastel Greens
  mintGreen: "#A8E6CF",
  softSage: "#DDEDCF",
  paleEmerald: "#a5dabc",
  seafoam: "#D9F9C8",
  pastelTeal: "#A0E0D0",
  slateTeal: "#65a89c",

  // Neutrals & Complementary Tones
  ivoryWhite: "#FFF9EB",
  pastelBeige: "#F5EEDF",
  coolGray: "#E2E6E8",
  warmGray: "#D6D3C9",
  softCharcoal: "#4A4A4A",
  charcoal: "#2C2C2C"
};

/* dynamic theme*/
export const useTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    background: isDark ? Colors.charcoal : Colors.ivoryWhite,
    primary:isDark ? Colors.slateTeal : Colors.paleEmerald,
    secondary: Colors.softSage,
    text: isDark ? Colors.ivoryWhite : Colors.softCharcoal,
    cardBackground: isDark ? Colors.slateTeal : Colors.seafoam,
    accent: Colors.slateTeal,
  };
};
