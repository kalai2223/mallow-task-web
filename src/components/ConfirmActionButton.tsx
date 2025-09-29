import React from 'react';

import { Popconfirm } from 'antd';

interface ConfirmActionButtonProps {
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children: React.ReactNode; // button, icon, or any element
}

const ConfirmActionButton: React.FC<ConfirmActionButtonProps> = ({
  title = 'Are you sure?',
  description,
  okText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      okText={okText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {/* Any child element gets wrapped with confirmation */}
      <span className="cursor-pointer">{children}</span>
    </Popconfirm>
  );
};

export default ConfirmActionButton;
