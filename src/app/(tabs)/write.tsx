import { AppText } from '@/components/AppText';
import { Screen } from '@/components/Screen';
import { strings } from '@/strings';

export default function WriteScreen() {
  return (
    <Screen surface="paper">
      <AppText variant="label" color="textMutedOnPaper">
        {strings.write.fieldNote}
      </AppText>
      <AppText variant="prompt" color="textOnPaper" accessibilityRole="header">
        {strings.write.emptyPrompt}
      </AppText>
      <AppText variant="reading" color="textMutedOnPaper">
        {strings.write.emptyBody}
      </AppText>
    </Screen>
  );
}
