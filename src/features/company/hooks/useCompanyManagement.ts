import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { Company, CompanyStatus } from "@/types/company/company";
import { CompanyUseCases } from "@/features/company/services/companyUseCases";
import { CompanyService } from "@/features/company/services/companyService";

export const useCompanyManagement = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const companyService = CompanyService.getInstance();
  const companyUseCases = new CompanyUseCases(companyService);

  const loadCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await companyUseCases.getCompanies();
      setCompanies(data);
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchTerm(query);
    setSearchLoading(true);

    try {
      const data = await companyUseCases.searchCompanies(query);

      setCompanies(data);
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleEdit = useCallback((company: Company) => {
    return company;
  }, []);

  const handleDelete = useCallback(
    async (company: Company) => {
      try {
        const result = await companyUseCases.deleteCompany(company.id);
        message.success(result.message);
        await loadCompanies(); 
      } catch (error) {
        message.error((error as Error).message);
      }
    },
    [loadCompanies]
  );

  const handleToggleStatus = useCallback(
    async (company: Company) => {
      try {
        const result = await companyUseCases.toggleCompanyStatus(company);
        message.success(result.message);
        await loadCompanies(); 
      } catch (error) {
        message.error((error as Error).message);
      }
    },
    [loadCompanies]
  );

  const handleCreate = useCallback(
    async (companyData: {
      name: string;
      logoFile?: any;
      isotipoFile?: any;
    }) => {
      try {
        const newCompany = await companyUseCases.createCompany(
          companyData.name,
          {
            logoFile: companyData.logoFile,
            isotipoFile: companyData.isotipoFile,
          }
        );
        message.success("Empresa creada exitosamente");
        await loadCompanies(); 
        return newCompany;
      } catch (error) {
        message.error((error as Error).message);
        throw error;
      }
    },
    [loadCompanies]
  );

  const handleUpdate = useCallback(
    async (
      id: string,
      updates: { name: string; logoFile?: any; isotipoFile?: any }
    ) => {
      try {
        const { logoFile, isotipoFile, ...companyData } = updates;
        
        const files = logoFile || isotipoFile ? { logoFile, isotipoFile } : undefined;
        
        const updatedCompany = await companyUseCases.updateCompany(
          id,
          companyData,
          files
        );
        message.success("Empresa actualizada exitosamente");
        await loadCompanies(); 
        return updatedCompany;
      } catch (error) {
        message.error((error as Error).message);
        throw error;
      }
    },
    [loadCompanies]
  );

  const handleSettingsClick = useCallback(() => {
    message.info("Configuraciones del sistema");
  }, []);

  // Efectos
  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return {
    // Estados
    companies,
    loading,
    searchTerm,
    searchLoading,

    // Acciones CRUD
    handleSearch,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    handleCreate,
    handleUpdate,
    handleSettingsClick,

    // Utilidades
    refreshCompanies: loadCompanies,
  };
};