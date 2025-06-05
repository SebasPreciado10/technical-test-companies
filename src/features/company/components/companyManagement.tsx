"use client";

import React, { useState } from "react";
import { Layout, Typography, Breadcrumb, Button, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Sidebar from "@/features/company/components/ui/sideBar";
import SearchFilter from "@/features/company/components/ui/searchFilter";
import CompanyTable from "@/features/company/components/companyTable";
import EditCompanyModal from "@/features/company/components/ui/editCompanyModal";
import { useCompanyManagement } from "@/features/company/hooks/useCompanyManagement";
import CreateCompanyModal from "./ui/createCompanyModal";
import { Company } from "@/types/company/company";

const { Title } = Typography;
const { Content } = Layout;

const CompanyManagement: React.FC = () => {
  const {
    companies,
    loading,
    searchTerm,
    searchLoading,
    handleSearch,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    handleCreate,
    handleUpdate,
    handleSettingsClick,
  } = useCompanyManagement();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalOk = async (data: { name: string; logoFile?: any; isotipoFile?: any }) => {
    try {
      await handleCreate(data);
      setIsCreateModalOpen(false);
    } catch (error) {
    }
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditAction = (company: Company) => {
    setEditingCompany(company);
    setIsEditModalOpen(true);
  };

  const handleEditModalOk = async (id: string, data: { name: string; logoFile?: any; isotipoFile?: any }) => {
    try {
      await handleUpdate(id, { name: data.name, logoFile: data.logoFile, isotipoFile: data.isotipoFile });
      setIsEditModalOpen(false);
      setEditingCompany(null);
    } catch (error) {
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setEditingCompany(null);
  };

  return (
    <App>
      <Layout className="company-management-layout">
        <Sidebar onSettingsClick={handleSettingsClick} />

        <Layout>
          <Content>
            <div className="main-content-container">

              <div className="page-breadcrumb">
                <Breadcrumb
                  items={[
                    {
                      title: (
                        <span style={{ color: "#9ca3af" }}>lorem ipsum</span>
                      ),
                    },
                    {
                      title: (
                        <span style={{ color: "#4b5563" }}>
                          Lista de empresas
                        </span>
                      ),
                    },
                  ]}
                />
              </div>

              {/* Header de la página */}
              <div className="page-header">
                <div className="page-header-content">
                  <div className="page-title">
                    <Title
                      level={2}
                      style={{ margin: 0, color: "#1f2937", fontWeight: 600 }}
                    >
                      Lista de empresas
                    </Title>
                  </div>
                  <div className="page-actions">
                    <span
                      style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginRight: "16px",
                      }}
                    >
                      {companies.length.toString().padStart(2, "0")} empresas
                    </span>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={showCreateModal}
                      size="large"
                      style={{
                        backgroundColor: "#262776",
                        borderColor: "#262776",
                        borderRadius: "8px",
                        height: "40px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Crear nueva empresa
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sección de búsqueda */}
              <div className="search-section">
                <div className="search-container-wrapper">
                  <SearchFilter
                    placeholder="Buscar por nombre"
                    value={searchTerm}
                    onChange={handleSearch}
                    loading={searchLoading}
                    className="w-full max-w-md"
                  />
                </div>
              </div>

              {/* Sección de tabla */}
              <div className="table-section">
                <CompanyTable
                  companies={companies}
                  loading={loading}
                  onEdit={handleEditAction}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              </div>
            </div>
          </Content>
        </Layout>

        {/* Modales */}
        <CreateCompanyModal
          open={isCreateModalOpen}
          onOk={handleCreateModalOk}
          onCancel={handleCreateModalCancel}
        />
        
        <EditCompanyModal
          open={isEditModalOpen}
          company={editingCompany}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
        />
      </Layout>
    </App>
  );
};

export default CompanyManagement;