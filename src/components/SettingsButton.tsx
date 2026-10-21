import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet } from 'react-native';

import { strings } from '@/strings';
import { colors, minTouchTarget, type ColorToken } from '@/theme';

import { AppText } from './AppText';

type Props = { color?: ColorToken };

/** The small top-level Settings control (PRD §6). */
export function SettingsButton({ color = 'textOnDark' }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={strings.settings.open}
      onPress={() => router.push('/settings')}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <SymbolView
        name={{ ios: 'gearshape', android: 'settings', web: 'settings' }}
        size={22}
        tintColor={colors[color]}
        fallback={
          <AppText variant="meta" color={color}>
            {strings.settings.open}
          </AppText>
        }
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: minTouchTarget,
    minHeight: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
});
