import { logEvent, setLogSink, type LogMetadata } from '../log';

describe('logEvent', () => {
  let calls: [string, LogMetadata][];

  beforeEach(() => {
    calls = [];
    setLogSink((event, metadata) => calls.push([event, metadata]));
  });

  it('passes through numbers, booleans and identifiers', () => {
    logEvent('entry_saved', { promptId: 'many-selves-01', length: 120, offline: true });
    expect(calls).toEqual([
      ['entry_saved', { promptId: 'many-selves-01', length: 120, offline: true }],
    ]);
  });

  it('redacts anything that looks like free text', () => {
    logEvent('entry_saved', { body: 'I have never told anyone this.' });
    expect(calls[0][1]).toEqual({ body: '[redacted]' });
  });

  it('rejects event names that are not identifiers', () => {
    expect(() => logEvent('user wrote something')).toThrow();
  });
});
