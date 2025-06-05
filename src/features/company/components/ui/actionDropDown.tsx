import React from "react";
import { Button, Dropdown, App } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { ActionDropdownProps, CompanyStatus } from "@/types/company/company";

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  company,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const { modal } = App.useApp();

  const handleDelete = () => {
    modal.confirm({
      title: "Confirmar eliminación",
      content: (
        <div>
          <p>¿Estás seguro de que deseas eliminar la empresa:</p>
          <p className="font-medium mt-2">"{company.name}"?</p>
          <p className="text-sm text-gray-500 mt-2">
            Esta acción no se puede deshacer.
          </p>
        </div>
      ),
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await onDelete(company);
        } catch (error) {
          console.error("Error al eliminar empresa:", error);
        }
      },
      centered: true,
      width: 420,
    });
  };

  const handleToggleStatus = () => {
    const action =
      company.status === CompanyStatus.ACTIVE ? "desactivar" : "activar";
    const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);

    modal.confirm({
      title: `Confirmar ${action}`,
      content: (
        <div>
          <p>¿Estás seguro de que deseas {action} la empresa:</p>
          <p className="font-medium mt-2">"{company.name}"?</p>
        </div>
      ),
      okText: actionCapitalized,
      okType: action === "desactivar" ? "danger" : "primary",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await onToggleStatus(company);
        } catch (error) {
          console.error("Error al cambiar estado:", error);
        }
      },
      centered: true,
      width: 420,
    });
  };

  const menuItems = [
    {
      key: "edit",
      icon: <EditOutlined className="text-slate-500" />,
      label: <span className="text-slate-700">Editar empresa</span>,
      onClick: () => onEdit(company),
    },
    {
      key: "toggle",
      icon: <PoweroffOutlined className="text-slate-500" />,
      label: (
        <span className="text-slate-700">
          {company.status === CompanyStatus.ACTIVE
            ? "Desactivar empresa"
            : "Activar empresa"}
        </span>
      ),
      onClick: handleToggleStatus,
    },
    {
      type: "divider" as const,
    },
    {
      key: "delete",
      icon: <DeleteOutlined className="text-red-500" />,
      label: <span className="text-red-600">Eliminar empresa</span>,
      onClick: handleDelete,
      className: "danger-item",
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
      arrow={false}
      overlayClassName="company-actions-dropdown"
    >
      <Button
        type="text"
        className="company-actions-button px-3 py-1.5 h-auto flex items-center gap-2 border border-slate-300 rounded-lg hover:border-[#262776] hover:bg-slate-50 transition-all duration-200"
      >
        <span className="text-xs font-medium text-slate-600">Acciones</span>
        <MoreOutlined className="text-slate-500" />
      </Button>
    </Dropdown>
  );
};

export default ActionDropdown;