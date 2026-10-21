import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

import { SettingsButton } from './SettingsButton';

type Props = {
  /** `dark` for Home and Archive, `paper` (ivory) for writing (decision D10). */
  surface: 'dark' | 'paper';
  children: ReactNode;
};

/** A top-level tab screen: fixed surface color, safe areas, and the Settings control. */
export function Screen({ surface, children }: Props) {
  const isDark = surface === 'dark';
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.root, { backgroundColor: isDark ? colors.surfaceDark : colors.surfacePaper }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.topBar}>
        <SettingsButton color={isDark ? 'textOnDark' : 'textOnPaper'} />
      </View>
      <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.sm,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
});
