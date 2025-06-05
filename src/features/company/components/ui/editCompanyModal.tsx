import React, { useState, useEffect } from 'react';
import { Modal, Input, Upload, Button, Image, Alert } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Company } from '@/types/company/company';
import { EditCompanyModalProps } from '@/types/company/crudCompany';
import type { UploadFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  open,
  company,
  onCancel,
  onOk,
  loading = false
}) => {
  const [name, setName] = useState('');

  const [logoFile, setLogoFile] = useState<UploadFile<any> | null>(null);
  const [isotipoFile, setIsotipoFile] = useState<UploadFile<any> | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (open && company) {
      setName(company.name);
      setLogoFile(null);
      setIsotipoFile(null);
    }
  }, [open, company]);

  const hasCurrentLogo = company?.logoUrl;
  const hasCurrentIsotipo = company?.isotipoUrl;
  const hasCurrentLogos = hasCurrentLogo && hasCurrentIsotipo;
  const hasNewLogos = logoFile && isotipoFile;
  const isFormValid = name.trim() !== '' && (hasCurrentLogos || hasNewLogos);

  const handleOk = async () => {
    if (isFormValid && company) {
      setSubmitLoading(true);
      try {
        await onOk(company.id, {
          name: name.trim(),
          logoFile: logoFile?.originFileObj || logoFile, 
          isotipoFile: isotipoFile?.originFileObj || isotipoFile 
        });
        handleReset();
      } catch (error) {
        throw new Error('Error al actualizar la empresa: ' + (error as Error).message); 
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  const handleCancel = () => {
    onCancel();
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setLogoFile(null);
    setIsotipoFile(null);
  };

  const logoUploadProps = {
    name: 'file',
    multiple: false,
    accept: '.jpg,.jpeg,.png',
    beforeUpload: () => false, 
    onChange: (info: { fileList: string | any[]; }) => {
      if (info.fileList.length > 0) {
        const file = info.fileList[0];
        setLogoFile(file);
      } else {
        setLogoFile(null);
      }
    },
    fileList: logoFile ? [logoFile] : [],
    onRemove: () => {
      setLogoFile(null);
    },
  };

  const isotipoUploadProps = {
    name: 'file',
    multiple: false,
    accept: '.jpg,.jpeg,.png',
    beforeUpload: () => false,
    onChange: (info: { fileList: string | any[]; }) => {
      if (info.fileList.length > 0) {
        const file = info.fileList[0];
        setIsotipoFile(file);
      } else {
        setIsotipoFile(null);
      }
    },
    fileList: isotipoFile ? [isotipoFile] : [],
    onRemove: () => {
      setIsotipoFile(null);
    },
  };

  return (
    <Modal
      title="Editar empresa"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={submitLoading}>
          Cancelar
        </Button>,
        <Button 
          key="ok" 
          type="primary" 
          onClick={handleOk}
          disabled={!isFormValid}
          loading={submitLoading}
          className="bg-[#262776] hover:bg-[#1e1f5c] disabled:bg-gray-300"
        >
          Actualizar empresa
        </Button>,
      ]}
      width={600}
      centered
      maskClosable={false}
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Editar sucursal: {company?.name}
        </h3>
        {!hasCurrentLogos && (
          <Alert
            message="Esta empresa no tiene imágenes guardadas. Debes subir logo e isotipo."
            type="warning"
            showIcon
            className="mt-4"
          />
        )}
      </div>

      <div className="space-y-8 px-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <span className="text-red-500">*</span> Nombre
          </label>
          <Input 
            placeholder="Escribir nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="large"
            className="w-full border-gray-200"
            disabled={submitLoading}
            maxLength={100}
            showCount
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <span className="text-red-500">*</span> Adjuntar logo completo
            {hasCurrentLogo && <span className="text-gray-400"> (opcional - ya tienes uno guardado)</span>}
          </label>
          
          {/* Siempre mostrar el logo actual si existe */}
          {company?.logoUrl && !logoFile && (
            <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <Image
                  width={50}
                  height={50}
                  src={company.logoUrl}
                  className="rounded-lg object-cover"
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgMAGhOxBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA="
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Logo actual</p>
                  <p className="text-xs text-gray-500">Sube una nueva imagen para reemplazarla</p>
                </div>
              </div>
            </div>
          )}

          <Dragger 
            {...logoUploadProps}
            className="border-2 border-dashed border-gray-200 rounded-lg bg-white hover:border-blue-400"
            disabled={submitLoading}
          >
            <div className="py-12 px-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <InboxOutlined className="text-3xl text-blue-500" />
                </div>
              </div>
              <p className="text-base font-medium text-gray-900 mb-2">
                {hasCurrentLogo ? 'Cambiar logo' : 'Subir logo'}
              </p>
              <p className="text-sm text-gray-500">JPG, PNG</p>
            </div>
          </Dragger>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <span className="text-red-500">*</span> Adjuntar isotipo
            {hasCurrentIsotipo && <span className="text-gray-400"> (opcional - ya tienes uno guardado)</span>}
          </label>
          
          {/* Siempre mostrar el isotipo actual si existe */}
          {company?.isotipoUrl && !isotipoFile && (
            <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <Image
                  width={50}
                  height={50}
                  src={company.isotipoUrl}
                  className="rounded-lg object-cover"
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8O+L6oKyFE+gDYgLMJuQJYEhXIAhKwRJgA3IS2gJJMAQQEIMWYEhR4ahBEsGgCAGhOxBxgw2GQwLGzQEhExJM/1Od1efrq7urj59/+d9t7tz353/73f6dev1e3/2s5+d3n777fPNzc3TQy4GQIAABCA="
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Isotipo actual</p>
                  <p className="text-xs text-gray-500">Sube una nueva imagen para reemplazarla</p>
                </div>
              </div>
            </div>
          )}

          <Dragger 
            {...isotipoUploadProps}
            className="border-2 border-dashed border-gray-200 rounded-lg bg-white hover:border-blue-400"
            disabled={submitLoading}
          >
            <div className="py-12 px-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <InboxOutlined className="text-3xl text-blue-500" />
                </div>
              </div>
              <p className="text-base font-medium text-gray-900 mb-2">
                {hasCurrentIsotipo ? 'Cambiar isotipo' : 'Subir isotipo'}
              </p>
              <p className="text-sm text-gray-500">JPG, PNG</p>
            </div>
          </Dragger>
        </div>
      </div>
    </Modal>
  );
};

export default EditCompanyModal;