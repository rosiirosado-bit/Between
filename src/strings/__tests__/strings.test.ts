import { strings } from '..';

function leaves(value: unknown, path = ''): [string, unknown][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));
  }
  return [[path, value]];
}

describe('strings', () => {
  it('has only non-empty text values', () => {
    for (const [path, value] of leaves(strings)) {
      expect({ path, ok: typeof value === 'string' && value.trim().length > 0 }).toEqual({
        path,
        ok: true,
      });
    }
  });
});
