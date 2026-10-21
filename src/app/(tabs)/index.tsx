import { AppText } from '@/components/AppText';
import { Screen } from '@/components/Screen';
import { strings } from '@/strings';

export default function HomeScreen() {
  return (
    <Screen surface="dark">
      <AppText variant="wordmark" accessibilityRole="header">
        {strings.app.wordmark}
      </AppText>
      <AppText variant="label" color="textMutedOnDark">
        {strings.home.transitStub}
      </AppText>
      <AppText variant="display">{strings.app.tagline}</AppText>
      <AppText variant="body" color="textMutedOnDark">
        {strings.home.collectionsPlaceholder}
      </AppText>
    </Screen>
  );
}
