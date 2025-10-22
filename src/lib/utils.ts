type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: string, dateStyle: DateStyle = "medium", locale = "en-IN") {
	const dateToFormat = new Date(date.replaceAll("-", "/"));
	const dateFormatter = Intl.DateTimeFormat(locale, { dateStyle });
	return dateFormatter.format(dateToFormat);
}
