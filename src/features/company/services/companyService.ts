import { Company, CompanyStatus } from "@/types/company/company";
import { ICompanyService } from "@/types/company/companyService";

export class CompanyService implements ICompanyService {
  private static instance: CompanyService;
  private readonly STORAGE_KEY = "companies_data";

  private defaultCompanies: Company[] = [
    {
      id: "01",
      name: "Empresa nombre ABC",
      status: CompanyStatus.ACTIVE,
      logoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOxBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
      isotipoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOzBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
    },
    {
      id: "02",
      name: "Empresa nombre DEF",
      status: CompanyStatus.ACTIVE,
      logoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOzBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
      isotipoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOzBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
    },
    {
      id: "03",
      name: "Empresa nombre GHI",
      status: CompanyStatus.ACTIVE,
      logoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOzBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
      isotipoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOzBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
    },
    {
      id: "04",
      name: "Empresa nombre JKL",
      status: CompanyStatus.ACTIVE,
      logoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOzBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
      isotipoUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOzBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA=",
    },
    {
      id: "05",
      name: "Empresa nombre MNO",
      status: CompanyStatus.INACTIVE,
    },
  ];

  public static getInstance(): CompanyService {
    if (!CompanyService.instance) {
      CompanyService.instance = new CompanyService();
    }
    return CompanyService.instance;
  }

  private constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        this.saveToStorage(this.defaultCompanies);
      }
    }
  }

  private getFromStorage(): Company[] {
    if (typeof window === "undefined") return this.defaultCompanies;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : this.defaultCompanies;
    } catch (error) {
      console.error("Error parsing companies from localStorage:", error);
      return this.defaultCompanies;
    }
  }

  private saveToStorage(companies: Company[]): void {
    if (typeof window !== "undefined") {
      try {
        const jsonString = JSON.stringify(companies);

        if (jsonString.length > 5000000) {
          console.warn(
            "Data too large for localStorage, attempting to save anyway..."
          );
        }

        localStorage.setItem(this.STORAGE_KEY, jsonString);

        const verification = localStorage.getItem(this.STORAGE_KEY);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "QuotaExceededError"
        ) {
          console.error(
            "Storage quota exceeded. Attempting to compress data..."
          );
          this.handleStorageQuotaExceeded(companies);
        } else {
          console.error("Error saving companies to localStorage:", error);
        }
      }
    }
  }

  private handleStorageQuotaExceeded(companies: Company[]): void {
    try {
      const companiesWithoutLargeImages = companies.map((company) => ({
        ...company,
        logoUrl:
          company.logoUrl && company.logoUrl.length > 100000
            ? "LARGE_IMAGE_STORED"
            : company.logoUrl,
        isotipoUrl:
          company.isotipoUrl && company.isotipoUrl.length > 100000
            ? "LARGE_IMAGE_STORED"
            : company.isotipoUrl,
      }));

      const jsonString = JSON.stringify(companiesWithoutLargeImages);
      localStorage.setItem(this.STORAGE_KEY, jsonString);
    } catch (error) {
      alert(
        "Error: No se pudo guardar la empresa debido a limitaciones de almacenamiento."
      );
    }
  }

  private compressImage(file: File, maxSizeKB: number = 500): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const maxWidth = 800;
        const maxHeight = 600;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        let quality = 0.8;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);

        while (dataUrl.length > maxSizeKB * 1024 && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(dataUrl);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  private fileToBase64(file: File): Promise<string> {

    if (file.size > 1000000) {
      return this.compressImage(file, 300);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
        reject(error);
      };
    });
  }

  async getAll(): Promise<Company[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const companies = this.getFromStorage();
        resolve([...companies]);
      }, 100);
    });
  }

  async search(query: string): Promise<Company[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const companies = this.getFromStorage();
        const filtered = companies.filter((company) =>
          company.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 100);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const companies = this.getFromStorage();
        const filteredCompanies = companies.filter((c) => c.id !== id);
        this.saveToStorage(filteredCompanies);
        resolve();
      }, 100);
    });
  }

  async updateStatus(id: string, status: CompanyStatus): Promise<Company> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const companies = this.getFromStorage();
        const company = companies.find((c) => c.id === id);
        if (company) {
          company.status = status;
          this.saveToStorage(companies);
          resolve(company);
        } else {
          reject(new Error("Company not found"));
        }
      }, 100);
    });
  }

  async create(
    companyData: Omit<Company, "id">,
    files?: { logoFile?: any; isotipoFile?: any }
  ): Promise<Company> {
    let logoUrl: string | undefined;
    let isotipoUrl: string | undefined;

    if (files?.logoFile && files?.isotipoFile) {
      try {
        logoUrl = await this.fileToBase64(files.logoFile);
        isotipoUrl = await this.fileToBase64(files.isotipoFile);
      } catch (error) {
        throw new Error(
          "Error al procesar las imágenes: " + (error as Error).message
        );
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const companies = this.getFromStorage();

          const newCompany: Company = {
            ...companyData,
            id: (companies.length + 1).toString().padStart(2, "0"),
            ...(logoUrl && { logoUrl }),
            ...(isotipoUrl && { isotipoUrl }),
          };

          companies.push(newCompany);

          this.saveToStorage(companies);

          resolve(newCompany);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  async update(
    id: string,
    companyData: Partial<Company>,
    files?: { logoFile?: any; isotipoFile?: any }
  ): Promise<Company> {
    let logoUrl: string | undefined;
    let isotipoUrl: string | undefined;

    if (files?.logoFile) {
      try {
        logoUrl = await this.fileToBase64(files.logoFile);
      } catch (error) {
        throw new Error("Error al procesar el logo");
      }
    }

    if (files?.isotipoFile) {
      try {
        isotipoUrl = await this.fileToBase64(files.isotipoFile);
      } catch (error) {
        throw new Error("Error al procesar el isotipo");
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const companies = this.getFromStorage();
        const companyIndex = companies.findIndex((c) => c.id === id);

        if (companyIndex !== -1) {
          const updatedData = {
            ...companyData,
            ...(logoUrl && { logoUrl }),
            ...(isotipoUrl && { isotipoUrl }),
          };

          companies[companyIndex] = {
            ...companies[companyIndex],
            ...updatedData,
          };
          this.saveToStorage(companies);
          resolve(companies[companyIndex]);
        } else {
          reject(new Error("Company not found"));
        }
      }, 100);
    });
  }

  async resetData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.saveToStorage(this.defaultCompanies);
        resolve();
      }, 100);
    });
  }
}
