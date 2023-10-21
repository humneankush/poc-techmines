
export function formatTimestampToClock(timestamp) {
    const match = timestamp.match(/(\d{2}):(\d{2}):(\d{2})/);
    if (match) {
        const [, hours, minutes, seconds] = match;
        const utcHours = Number(hours) - 4;
        const adjustedHours = (utcHours + 24) % 24;
        const digitalClock = `${adjustedHours}:${minutes}:${seconds}`;
        return digitalClock;
    } else {
        return 'Invalid timestamp format';
    }
}
