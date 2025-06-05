import { Company, CompanyStatus } from '@/types/company/company';
import { ICompanyService } from '@/types/company/companyService';

export class CompanyUseCases {
  constructor(private companyService: ICompanyService) {}

  async getCompanies(): Promise<Company[]> {
    try {
      return await this.companyService.getAll();
    } catch (error) {
      throw new Error('Error al obtener empresas: ' + (error as Error).message);
    }
  }

  async searchCompanies(query: string): Promise<Company[]> {
    if (!query.trim()) {
      return this.getCompanies();
    }

    if (query.trim().length < 2) {
      throw new Error('La búsqueda debe tener al menos 2 caracteres');
    }

    try {
      return await this.companyService.search(query);
    } catch (error) {
      throw new Error('Error al buscar empresas: ' + (error as Error).message);
    }
  }

  async deleteCompany(id: string): Promise<{ success: boolean; message: string }> {
    if (!id?.trim()) {
      throw new Error('ID de empresa requerido');
    }

    try {
      await this.companyService.delete(id);
      return { success: true, message: 'Empresa eliminada exitosamente' };
    } catch (error) {
      throw new Error('Error al eliminar empresa: ' + (error as Error).message);
    }
  }

  async toggleCompanyStatus(company: Company): Promise<{ success: boolean; message: string }> {
    const newStatus = company.status === CompanyStatus.ACTIVE 
      ? CompanyStatus.INACTIVE 
      : CompanyStatus.ACTIVE;

    try {
      await this.companyService.updateStatus(company.id, newStatus);
      const actionText = newStatus === CompanyStatus.ACTIVE ? 'activada' : 'desactivada';
      return { 
        success: true, 
        message: `Empresa ${actionText} exitosamente` 
      };
    } catch (error) {
      throw new Error('Error al cambiar estado: ' + (error as Error).message);
    }
  }

  async createCompany(
    name: string, 
    files?: { logoFile?: any; isotipoFile?: any },
    status: CompanyStatus = CompanyStatus.ACTIVE
  ): Promise<Company> {
    
    if (!name?.trim()) {
      throw new Error('El nombre de la empresa es requerido');
    }

    if (name.trim().length < 3) {
      throw new Error('El nombre debe tener al menos 3 caracteres');
    }

    if (name.trim().length > 100) {
      throw new Error('El nombre no puede exceder 100 caracteres');
    }

    if (!files?.logoFile || !files?.isotipoFile) {
      throw new Error('Logo e isotipo son requeridos');
    }

    try {
      const result = await this.companyService.create(
        { name: name.trim(), status }, 
        files 
      );
      return result;
    } catch (error) {
      throw new Error('Error al crear empresa: ' + (error as Error).message);
    }
  }

  async updateCompany(
    id: string, 
    updates: Partial<Company>,
    files?: { logoFile?: any; isotipoFile?: any }
  ): Promise<Company> {
    if (!id?.trim()) {
      throw new Error('ID de empresa requerido');
    }

    if (updates.name !== undefined) {
      if (!updates.name?.trim()) {
        throw new Error('El nombre de la empresa es requerido');
      }

      if (updates.name.trim().length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
      }

      if (updates.name.trim().length > 100) {
        throw new Error('El nombre no puede exceder 100 caracteres');
      }
    }

    try {
      return await this.companyService.update(id, updates, files);  
    } catch (error) {
      throw new Error('Error al actualizar empresa: ' + (error as Error).message);
    }
  }
}