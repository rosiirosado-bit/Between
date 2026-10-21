import { useFonts } from 'expo-font';
import { DarkTheme, Stack, ThemeProvider, type Theme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { logEvent } from '@/lib/log';
import { strings } from '@/strings';
import { colors, fontAssets } from '@/theme';

SplashScreen.preventAutoHideAsync();

// Between keeps its own art-directed look regardless of the system setting (decision D10).
Appearance.setColorScheme('dark');

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accentOnDark,
    background: colors.surfaceDark,
    card: colors.surfaceDark,
    text: colors.textOnDark,
    border: colors.ruleOnDark,
  },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const ready = fontsLoaded || fontError != null;

  useEffect(() => {
    if (fontError) {
      // The app still works with system fonts; record that it happened, nothing more.
      logEvent('fonts_failed_to_load');
    }
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready, fontError]);

  if (!ready) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="settings"
            options={{ presentation: 'modal', title: strings.settings.title }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
