import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { strings } from '@/strings';
import { colors, minTouchTarget, spacing } from '@/theme';

export default function SettingsScreen() {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic">
      <AppText variant="label" color="textMutedOnDark">
        {strings.settings.comingSoon}
      </AppText>
      {strings.settings.sections.map((section) => (
        <View key={section} style={styles.row}>
          <AppText variant="body">{section}</AppText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surfaceDark },
  content: { padding: spacing.lg, gap: spacing.xs },
  row: {
    minHeight: minTouchTarget,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.ruleOnDark,
  },
});
