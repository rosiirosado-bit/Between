import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/AppText';
import { strings } from '@/strings';
import { minTouchTarget } from '@/theme';

/** Settings opens as a sheet over the tabs; swipe down or tap Done to close. */
export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.done}>
            <AppText variant="body" color="accentOnDark">
              {strings.settings.done}
            </AppText>
          </Pressable>
        ),
      }}>
      <Stack.Screen name="index" options={{ title: strings.settings.title }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  done: { minHeight: minTouchTarget, minWidth: minTouchTarget, justifyContent: 'center' },
});
