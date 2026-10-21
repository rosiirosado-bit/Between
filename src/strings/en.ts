/**
 * All user-facing English copy (PRD §10). Components read from `strings`, never literals.
 * Keys marked "Step N placeholder" are temporary and will be replaced in that BUILD_PLAN step.
 */
export const en = {
  app: {
    name: 'Between',
    wordmark: 'between',
    tagline: 'For the versions of yourself you don’t post.',
  },
  tabs: {
    home: 'Home',
    write: 'Write',
    archive: 'Archive',
  },
  settings: {
    open: 'Settings',
    title: 'Settings',
    done: 'Done',
    // Step 8 placeholder: sections listed so the shape of Settings is visible.
    comingSoon: 'Coming in a later build',
    sections: [
      'Export',
      'Privacy',
      'Subscription',
      'Reminders',
      'Help & support',
      'Accessibility',
      'Delete my data',
    ],
  },
  home: {
    // Sample editorial copy from PRD §8.
    transitStub: 'Between stops / Issue 01',
    // Step 4 placeholder.
    collectionsPlaceholder: 'Collections will appear here.',
  },
  write: {
    // Sample editorial copy from PRD §8.
    fieldNote: 'Field note 01 / Between stops',
    // Step 4 placeholder.
    emptyPrompt: 'Choose a question from Home to begin.',
    emptyBody: 'Your answer will go here, in this typeface.',
  },
  archive: {
    title: 'Archive',
    // Step 4 placeholder.
    empty: 'Nothing here yet. Entries you write will appear here, newest first.',
  },
} as const;

export type Strings = typeof en;
