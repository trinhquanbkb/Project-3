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
    key: "tracking",
    label: "Tracking",
    isTitle: false,
    icon: "package",
    // url: "/tracking/list",
    children: [
      {
        key: "tracking-search",
        label: "Tracking Search",
        url: "/tracking/search",
        parentKey: "tracking",
      },
      {
        key: "tracking-list",
        label: "Tracking List",
        parentKey: "tracking",
      },
      {
        key: "tracking-details",
        label: "Tracking Details",
        url: "/tracking/details",
        parentKey: "tracking",
      },
      {
        key: "tracking-manager",
        label: "Tracking Manager",
        url: "/tracking/manager",
        parentKey: "tracking",
      },
    ],
  },
  {
    key: "order",
    label: "Order",
    isTitle: false,
    icon: "shopping-bag",
    children: [
      {
        key: "order-list",
        label: "Order List",
        url: "/order/list",
        parentKey: "order",
      },
      {
        key: "order-details",
        label: "Order Details",
        url: "/order/details",
        parentKey: "order",
      },
      {
        key: "order-manager",
        label: "Order Manager",
        url: "/order/manager",
        parentKey: "order",
      },
    ],
  },
  {
    key: "awb",
    label: "AWB",
    isTitle: false,
    icon: "truck",
    children: [
      {
        key: "awb-list",
        label: "Awb List",
        url: "/awb/list",
        parentKey: "awb",
      },
      {
        key: "awb-details",
        label: "Awb Detail",
        url: "/awb/details",
        parentKey: "awb",
      },
      {
        key: "awb-manager",
        label: "Awb Manager",
        url: "/awb/manager",
        parentKey: "awb",
      },
    ],
  },
  {
    key: "customer",
    label: "Customer",
    isTitle: false,
    icon: "users",
    url: "/customer/list",
    children: [
      {
        key: "customer-list",
        label: "Customer List",
        url: "/customer/list",
        parentKey: "customer",
      },
      {
        key: "customer-details",
        label: "Customer Detail",
        url: "/customer/details",
        parentKey: "customer",
      },
      {
        key: "customer-manager",
        label: "Customer Manager",
        url: "/customer/manager",
        parentKey: "customer",
      },
    ],
  },
  {
    key: "transaction",
    label: "Transaction",
    isTitle: false,
    icon: "dollar-sign",
    children: [
      {
        key: "transaction-list",
        label: "Transaction List",
        url: "/transaction/list",
        parentKey: "transaction",
      },
      {
        key: "transaction-details",
        label: "Transaction Detail",
        url: "/transaction/details",
        parentKey: "transaction",
      },
      {
        key: "transaction-manager",
        label: "Transaction Manager",
        url: "/transaction/manager",
        parentKey: "transaction",
      },
    ],
  },
  {
    key: "report",
    label: "Báo cáo",
    isTitle: false,
    icon: "activity",
    badge: { variant: "success", text: "02" },
    children: [
      {
        key: "ds-ecommerce",
        label: "Ecommerce",
        url: "/dashboard/ecommerce",
        parentKey: "report",
      },
      {
        key: "ds-analytics",
        label: "Analytics",
        url: "/dashboard/analytics",
        parentKey: "report",
      },
    ],
  },
  {
    key: "user",
    label: "User",
    isTitle: false,
    icon: "user",
    children: [
      {
        key: "user-list",
        label: "User List",
        url: "/user/list",
        parentKey: "user",
      },
      {
        key: "user-details",
        label: "User Detail",
        url: "/user/details",
        parentKey: "user",
      },
      {
        key: "user-manager",
        label: "User Manager",
        url: "/user/manager",
        parentKey: "user",
      },
    ],
  },
  {
    key: "setting",
    label: "Setting",
    isTitle: false,
    icon: "settings",
    children: [
      {
        key: "setting-list",
        label: "Setting List",
        url: "/setting/list",
        parentKey: "setting",
      },
      {
        key: "setting-details",
        label: "Setting Detail",
        url: "/setting/details",
        parentKey: "setting",
      },
      {
        key: "setting-manager",
        label: "Setting Manager",
        url: "/setting/manager",
        parentKey: "setting",
      },
    ],
  },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = MENU_ITEMS
const TWO_COl_MENU_ITEMS: MenuItemTypes[] = MENU_ITEMS

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
