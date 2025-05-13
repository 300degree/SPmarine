export function formatDate(date: Date) {
	const locale = navigator.language || 'en-US';

	return new Date(date).toLocaleString(locale, {
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});
}
