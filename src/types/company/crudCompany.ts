import { Company } from "./company";

export interface CreateCompanyModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (data: { name: string; logoFile?: any; isotipoFile?: any }) => Promise<void>;
  loading?: boolean;
}

export interface EditCompanyModalProps {
  open: boolean;
  company: Company | null;
  onCancel: () => void;
  onOk: (id: string, data: { name: string; logoFile?: any; isotipoFile?: any }) => Promise<void>;
  loading?: boolean;
}