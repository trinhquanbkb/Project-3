export const convertDate = (date: string | undefined) => {
	if (date) {
		const isoDate = new Date(date);

		const formattedDate = isoDate.toLocaleString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZone: "UTC",
		});

		return formattedDate;
	} else return "";
};
