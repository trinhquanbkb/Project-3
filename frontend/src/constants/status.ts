export const checkStatus = (data: any) => {
	let statusClass;
	switch (data) {
		case "Chờ duyệt":
			statusClass = "cho-duyet";
			break;
		case "Hủy":
			statusClass = "huy";
			break;
		case "Huỷ":
			statusClass = "huy";
			break;
		case "Thành công":
			statusClass = "thanh-cong";
			break;
		default:
			statusClass = "";
	}
	return statusClass;
};
