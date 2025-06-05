// src/types/searchFilter/types.ts
export interface SearchFilterProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  maxWidth?: string;
}