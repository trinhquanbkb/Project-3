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
		key: "report",
		label: "Báo cáo",
		isTitle: false,
		icon: "clipboard",
		url: "/report",
	},
	{
		key: "statistics",
		label: "Thống kê",
		isTitle: false,
		icon: "dollar-sign",
		url: "/statistics",
	},
	{
		key: "setting",
		label: "Cấu hình",
		isTitle: false,
		icon: "settings",
		children: [
			{
				key: "setting-role",
				label: "Vai trò",
				url: "/setting/role",
				parentKey: "setting",
			},
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
