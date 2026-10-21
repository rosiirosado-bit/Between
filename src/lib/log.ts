/**
 * The only logging entry point in the app (CLAUDE.md privacy rules, PRD §9).
 *
 * It accepts an event name plus non-content metadata: numbers, booleans, and short identifiers
 * such as a prompt ID or an error code. It must never receive entry text, transcripts, audio,
 * search terms, or export contents, so string values are limited to identifier-like tokens.
 * `console` is banned elsewhere by ESLint.
 */
export type LogMetadata = Record<string, number | boolean | string | null | undefined>;

export type LogSink = (event: string, metadata: LogMetadata) => void;

const IDENTIFIER = /^[A-Za-z0-9._:-]{1,64}$/;

let sink: LogSink = (event, metadata) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[between] ${event}`, metadata);
  }
};

/** Replace where events go (e.g. crash reporting later, or a test spy). */
export function setLogSink(next: LogSink): void {
  sink = next;
}

export function logEvent(event: string, metadata: LogMetadata = {}): void {
  if (!IDENTIFIER.test(event)) {
    throw new Error('logEvent: event names must be short identifiers');
  }
  const safe: LogMetadata = {};
  for (const [key, value] of Object.entries(metadata)) {
    // Anything that isn't a short identifier is dropped rather than risk logging private text.
    safe[key] = typeof value === 'string' && !IDENTIFIER.test(value) ? '[redacted]' : value;
  }
  sink(event, safe);
}
