import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Company, CompanyTableProps } from "@/types/company/company";
import StatusBadge from "@/features/company/components/ui/statusBadge";
import ActionDropdown from "@/features/company/components/ui/actionDropDown";

const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  loading = false,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const columns: ColumnsType<Company> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: string) => (
        <span className="font-mono text-slate-600 font-semibold text-sm tracking-wide">
          {id}
        </span>
      ),
    },
    {
      title: "Nombre de empresa",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <span className="font-medium text-slate-800 text-sm">{name}</span>
      ),
    },
    {
      title: "Estado de oficina",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status: Company["status"]) => <StatusBadge status={status} />,
    },
    {
      title: "Acciones",
      key: "actions",
      width: 120,
      align: "center",
      render: (_, company) => (
        <ActionDropdown
          company={company}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ),
    },
  ];

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="company-table-container">
      <Table
        columns={columns}
        dataSource={companies}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: companies.length,
          showSizeChanger: true,
          pageSizeOptions: ["5",  "8", "10"],
          showQuickJumper: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
          size: "default",
          hideOnSinglePage: false,
          onChange: handlePaginationChange,
          onShowSizeChange: handlePaginationChange,
          itemRender: (current, type, originalElement) => {
            if (type === "prev") {
              return (
                <span className="flex items-center justify-center w-9 h-9">
                  ‹
                </span>
              );
            }
            if (type === "next") {
              return (
                <span className="flex items-center justify-center w-9 h-9">
                  ›
                </span>
              );
            }
            return originalElement;
          },
        }}
        scroll={{ x: true }}
        size="middle"
        className="company-table"
        rowClassName={(record, index) =>
          `transition-colors duration-200 ${
            index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
          } hover:bg-slate-50`
        }
        locale={{
          emptyText: (
            <div className="py-12 text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">
                No hay empresas
              </h3>
              <p className="text-sm text-gray-500">
                Comienza creando tu primera empresa
              </p>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default CompanyTable;