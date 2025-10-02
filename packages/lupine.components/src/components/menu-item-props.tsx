export type MenuItemProps = {
  id: string;
  text: string; // "-" for break line
  url: string;
  js?: () => void;
  alt?: string;
  hide?: boolean;
  devAdmin?: boolean;
};

export type NestMenuItemProps = MenuItemProps & {
  items?: NestMenuItemProps[];
};
