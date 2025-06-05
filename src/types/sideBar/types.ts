import { ReactNode } from 'react';

export interface SidebarItem {
  id: string;
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  items?: SidebarItem[];
  onSettingsClick?: () => void;
}