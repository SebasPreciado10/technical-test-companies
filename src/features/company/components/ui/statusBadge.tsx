import React from 'react';
import { CompanyStatus, StatusBadgeProps, getStatusLabel } from '@/types/company/company';

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const label = getStatusLabel(status);
  
  const getTextColor = (status: CompanyStatus) => {
    if (status === CompanyStatus.ACTIVE) {
      return 'text-green-600';
    }
    return 'text-red-600';
  };
  
  const getDotClasses = (status: CompanyStatus) => {
    const baseClasses = "w-2 h-2 rounded-full flex-shrink-0";
    
    if (status === CompanyStatus.ACTIVE) {
      return `${baseClasses} bg-green-500`;
    }
    
    return `${baseClasses} bg-red-500`;
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div className={getDotClasses(status)} />
      <span className={`text-sm font-medium ${getTextColor(status)}`}>
        {label}
      </span>
    </div>
  );
};

export default StatusBadge;