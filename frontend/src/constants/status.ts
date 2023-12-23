export const checkStatus = (data: any) => {
	let statusClass;
	switch (data) {
		case "Chờ duyệt":
			statusClass = "cho-duyet";
			break;
		case "Chờ xuất kho":
			statusClass = "cho-xuat-kho";
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

export const checkStatusProductItem = (data: any) => {
	let statusClass;
	switch (data) {
		case "Đã duyệt":
			statusClass = "thanh-cong";
			break;
		case "Chưa duyệt":
			statusClass = "huy";
			break;
		default:
			statusClass = "";
	}
	return statusClass;
};
