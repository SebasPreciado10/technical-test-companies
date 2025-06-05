// src/types/company/index.ts - Fuente única de verdad para Company
export interface Company {
  id: string;
  name: string;
  status: CompanyStatus;
  createdAt?: Date;
  updatedAt?: Date;
  logoUrl?: string;
  isotipoUrl?: string;
}

export enum CompanyStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// Utilidades para trabajar con Company
export const getStatusLabel = (status: CompanyStatus): string => {
  return status === CompanyStatus.ACTIVE ? "Activo" : "Inactivo";
};

export const getStatusColor = (status: CompanyStatus): "success" | "error" => {
  return status === CompanyStatus.ACTIVE ? "success" : "error";
};

// Props para componentes
export interface CompanyTableProps {
  companies: Company[];
  loading?: boolean;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
  onToggleStatus: (company: Company) => void;
}

export interface ActionDropdownProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
  onToggleStatus: (company: Company) => void;
}

export interface StatusBadgeProps {
  status: CompanyStatus;
}

