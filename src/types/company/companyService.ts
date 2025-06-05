// src/services/interfaces/ICompanyService.ts
import { Company, CompanyStatus } from './company';

export interface ICompanyService {
  getAll(): Promise<Company[]>;
  search(query: string): Promise<Company[]>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, status: CompanyStatus): Promise<Company>;
  create(
    companyData: Omit<Company, 'id'>, 
    files?: { logoFile?: any; isotipoFile?: any }
  ): Promise<Company>;
  update(
    id: string, 
    companyData: Partial<Company>,
    files?: { logoFile?: any; isotipoFile?: any }
  ): Promise<Company>;
  resetData(): Promise<void>;
}