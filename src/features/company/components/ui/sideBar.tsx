import React from "react";
import { Layout } from "antd";
import {
  SettingOutlined,
  EyeOutlined,
  RocketOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { SidebarProps } from "@/types/sideBar/types";

const { Sider } = Layout;

const Sidebar: React.FC<SidebarProps> = ({ items = [], onSettingsClick }) => {
  return (
    <Sider width={80} className="ant-layout-sider" theme="light">
      <div className="sidebar-container">
        <div className="sidebar-logo">
          <Image
            src="/logo2.png"
            alt="Logo"
            width={24}
            height={24}
            className="sidebar-logo-image"
          />
          <div className="sidebar-logo-icon" style={{ display: "none" }} />
        </div>

        <div className="sidebar-navigation">
          <div className="sidebar-item inactive">
            <div className="sidebar-item-icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#6b7280"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
            </div>
          </div>

          <div className="sidebar-item inactive">
            <div className="sidebar-item-icon">
              <EyeOutlined style={{ fontSize: "14px", color: "#6b7280" }} />
            </div>
          </div>

          <div className="sidebar-item active">
            <div className="sidebar-item-icon">
              <RocketOutlined />
            </div>
          </div>
        </div>

        <div className="sidebar-spacer" />
        <div className="sidebar-settings" onClick={onSettingsClick}>
          <SettingOutlined style={{ fontSize: "14px" }} />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
