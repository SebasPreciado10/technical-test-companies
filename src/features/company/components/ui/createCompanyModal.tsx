import React, { useState } from 'react';
import { Modal, Input, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { CreateCompanyModalProps } from '@/types/company/crudCompany';

const { Dragger } = Upload;

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  open,
  onCancel,
  onOk,
  loading = false
}) => {
  const [name, setName] = useState('');
  const [logoFile, setLogoFile] = useState<any>(null);
  const [isotipoFile, setIsotipoFile] = useState<any>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const isFormValid = name.trim() !== '' && logoFile !== null && isotipoFile !== null;

  const handleOk = async () => {
    if (isFormValid) {
      setSubmitLoading(true);
      try {

        await onOk({
          name: name.trim(),
          logoFile: logoFile?.originFileObj || logoFile, 
          isotipoFile: isotipoFile?.originFileObj || isotipoFile 
        });
        handleReset();
      } catch (error) {

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
      title="Crear empresa"
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
          Crear empresa
        </Button>,
      ]}
      width={600}
      centered
      maskClosable={false}
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Nueva sucursal</h3>
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
          </label>
          <Dragger 
            {...logoUploadProps}
            className="border-2 border-dashed border-gray-200 rounded-lg bg-white hover:border-blue-400"
            disabled={submitLoading}
          >
            <div className="py-16 px-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <InboxOutlined className="text-3xl text-blue-500" />
                </div>
              </div>
              <p className="text-base font-medium text-gray-900 mb-2">
                Haz clic o arrastra para subir tu archivo
              </p>
              <p className="text-sm text-gray-500">JPG, PNG</p>
              {logoFile && (
                <p className="text-xs text-green-600 mt-2">
                  ✓ Archivo seleccionado: {logoFile.name}
                </p>
              )}
            </div>
          </Dragger>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <span className="text-red-500">*</span> Adjuntar isotipo
          </label>
          <Dragger 
            {...isotipoUploadProps}
            className="border-2 border-dashed border-gray-200 rounded-lg bg-white hover:border-blue-400"
            disabled={submitLoading}
          >
            <div className="py-16 px-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <InboxOutlined className="text-3xl text-blue-500" />
                </div>
              </div>
              <p className="text-base font-medium text-gray-900 mb-2">
                Haz clic o arrastra para subir tu archivo
              </p>
              <p className="text-sm text-gray-500">JPG, PNG</p>
              {isotipoFile && (
                <p className="text-xs text-green-600 mt-2">
                  ✓ Archivo seleccionado: {isotipoFile.name}
                </p>
              )}
            </div>
          </Dragger>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCompanyModal;