import { AppText } from '@/components/AppText';
import { Screen } from '@/components/Screen';
import { strings } from '@/strings';

export default function ArchiveScreen() {
  return (
    <Screen surface="dark">
      <AppText variant="heading" accessibilityRole="header">
        {strings.archive.title}
      </AppText>
      <AppText variant="body" color="textMutedOnDark">
        {strings.archive.empty}
      </AppText>
    </Screen>
  );
}
