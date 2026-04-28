export function date_convert(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
  		timeZone: 'America/New_York',
  		year: 'numeric',
  		month: '2-digit',
  		day: '2-digit'
	};
    return date.toLocaleDateString('en-US', options);
};