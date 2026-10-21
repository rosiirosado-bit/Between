/// <reference path="../../../node_modules/expo-router/build/ts-declarations/expect.d.ts" />
import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import { strings } from '@/strings';

// Render the real route files from src/app.
const appDir = './src/app';

// Native tabs keep every tab screen mounted, so each tab's Settings control is in the tree.
const settingsButtons = () => screen.getAllByLabelText(strings.settings.open);

describe('app navigation', () => {
  it('opens on Home with the wordmark and a Settings control on every tab', async () => {
    await renderRouter(appDir, { initialUrl: '/' });
    expect(await screen.findByText(strings.app.wordmark)).toBeVisible();
    expect(screen).toHavePathname('/');
    expect(settingsButtons()).toHaveLength(3);
  });

  it('shows the Write screen', async () => {
    await renderRouter(appDir, { initialUrl: '/write' });
    expect(await screen.findByText(strings.write.emptyPrompt)).toBeVisible();
    expect(screen).toHavePathname('/write');
  });

  it('shows the Archive screen', async () => {
    await renderRouter(appDir, { initialUrl: '/archive' });
    expect(await screen.findByText(strings.archive.empty)).toBeVisible();
    expect(screen).toHavePathname('/archive');
  });

  it('opens Settings from the top control and closes it with Done', async () => {
    await renderRouter(appDir, { initialUrl: '/' });
    await screen.findByText(strings.app.wordmark);
    await fireEvent.press(settingsButtons()[0]);

    expect(await screen.findByText(strings.settings.comingSoon)).toBeVisible();
    expect(screen).toHavePathname('/settings');

    await fireEvent.press(screen.getByText(strings.settings.done));
    expect(screen).toHavePathname('/');
  });
});
