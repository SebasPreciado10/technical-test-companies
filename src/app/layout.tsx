import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Company Management System",
  description: "Sistema de gestión de empresas con arquitectura limpia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider
            locale={esES}
            theme={{
              token: {
                colorPrimary: "#262776",
                borderRadius: 8,
                colorSuccess: "#52c41a",
                colorWarning: "#faad14",
                colorError: "#ff4d4f",
                fontFamily: "var(--font-geist-sans)",
              },
              components: {
                Button: {
                  controlHeight: 40,
                  fontSize: 14,
                },
                Input: {
                  controlHeight: 40,
                  fontSize: 14,
                },
                Table: {
                  headerBg: "#fafafa",
                  borderColor: "#f0f0f0",
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
