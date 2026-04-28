export function date_convert(date: Date): string {
    return date.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
};