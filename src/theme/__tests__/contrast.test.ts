import { colors, contrastRatio, palette } from '..';

describe('contrastRatio', () => {
  it('matches known WCAG values', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
  });

  it('rejects malformed colors', () => {
    expect(() => contrastRatio('red', '#FFFFFF')).toThrow();
  });
});

describe('color tokens', () => {
  // Body text needs 4.5:1 (WCAG AA). Large text and non-text UI need 3:1.
  const smallTextPairs: [string, string, string][] = [
    ['textOnDark', colors.textOnDark, colors.surfaceDark],
    ['textMutedOnDark', colors.textMutedOnDark, colors.surfaceDark],
    ['textOnPaper', colors.textOnPaper, colors.surfacePaper],
    ['textMutedOnPaper', colors.textMutedOnPaper, colors.surfacePaper],
    ['accentOnDark', colors.accentOnDark, colors.surfaceDark],
  ];

  it.each(smallTextPairs)('%s meets 4.5:1 for small text', (_name, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it('transit orange meets 3:1 for large text and accents on both surfaces', () => {
    expect(contrastRatio(colors.accent, colors.surfaceDark)).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(colors.accent, colors.surfacePaper)).toBeGreaterThanOrEqual(3);
  });

  it('keeps the PRD palette values', () => {
    expect(palette).toMatchObject({
      nearBlack: '#111113',
      ivory: '#F3F0E8',
      transitOrange: '#C84D1B',
      graphite: '#5C5A56',
    });
  });
});
