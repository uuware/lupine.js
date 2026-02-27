export interface IconMenuItemProps {
  icon: string;
  url: string;
  text: string;
  topout?: boolean; // Topout for mobile bottom icon menu
  js?: () => void;
}
