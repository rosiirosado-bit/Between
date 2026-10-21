import { NativeTabs } from 'expo-router/native-tabs';

import { strings } from '@/strings';
import { colors } from '@/theme';

/** Primary navigation: Home, Write, Archive (PRD §6). Uses the native iOS tab bar. */
export default function TabsLayout() {
  return (
    <NativeTabs tintColor={colors.accentOnDark}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{strings.tabs.home}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="write">
        <NativeTabs.Trigger.Label>{strings.tabs.write}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'square.and.pencil', selected: 'square.and.pencil' }}
          md="edit"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="archive">
        <NativeTabs.Trigger.Label>{strings.tabs.archive}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'archivebox', selected: 'archivebox.fill' }}
          md="inventory_2"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
