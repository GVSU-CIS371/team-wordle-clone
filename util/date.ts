export function date_convert(date: Date): string {
	const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const min = date.getMinutes();
    const day = days[date.getUTCDay()];
	const month = months[date.getUTCMonth()];
	const dayOfMonth = date.getUTCDate().toString().padStart(2, '0');
	const year = date.getUTCFullYear();
    return `${min} ${day} ${month} ${dayOfMonth} ${year}`;
};