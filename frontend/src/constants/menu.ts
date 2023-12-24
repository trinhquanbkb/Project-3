export interface MenuItemTypes {
	key: string;
	label: string;
	isTitle?: boolean;
	icon?: string;
	url?: string;
	badge?: {
		variant: string;
		text: string;
	};
	parentKey?: string;
	target?: string;
	children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
	{
		key: "receipt",
		label: "Phiếu nhập kho",
		isTitle: false,
		icon: "package",
		url: "/receipt",
	},
	{
		key: "delivery-bill",
		label: "Phiếu xuất kho",
		isTitle: false,
		icon: "shopping-bag",
		url: "/delivery-bill",
	},
	{
		key: "inventory",
		label: "Hàng tồn kho",
		isTitle: false,
		icon: "archive",
		url: "/inventory",
	},
	{
		key: "employee",
		label: "Nhân sự",
		isTitle: false,
		icon: "users",
		url: "/employees",
	},
	{
		key: "statistics",
		label: "Thống kê",
		isTitle: false,
		icon: "dollar-sign",
		children: [
			{
				key: "statistics-remain",
				label: "Thống kê số lượng sản phẩm tồn kho",
				url: "/statistics/remain",
				parentKey: "statistics",
			},
			{
				key: "statistics-sold",
				label: "Thống kê số lượng sản phẩm đã bán",
				url: "/statistics/sold",
				parentKey: "statistics",
			},
			{
				key: "statistics-top-remain",
				label: "Top các sản phẩm tồn kho",
				url: "/statistics/top-remain",
				parentKey: "statistics",
			},
			{
				key: "statistics-top-sold",
				label: "Top các sản phẩm bán chạy",
				url: "/statistics/top-sold",
				parentKey: "statistics",
			},
		],
	},
	{
		key: "setting",
		label: "Cấu hình",
		isTitle: false,
		icon: "settings",
		children: [
			{
				key: "setting-category",
				label: "Danh mục sản phẩm",
				url: "/setting/category",
				parentKey: "setting",
			},
			{
				key: "setting-supplier",
				label: "Đối tác kinh doanh",
				url: "/setting/supplier",
				parentKey: "setting",
			},
			{
				key: "setting-shipping",
				label: "Đối tác vận chuyển",
				url: "/setting/shipping",
				parentKey: "setting",
			},
			{
				key: "setting-warehouse",
				label: "Kho hàng",
				url: "/setting/warehouse",
				parentKey: "setting",
			},
		],
	},
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = MENU_ITEMS;
const TWO_COl_MENU_ITEMS: MenuItemTypes[] = MENU_ITEMS;

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
