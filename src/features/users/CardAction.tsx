import React from 'react';

import { EditOutlined, DeleteFilled } from '@ant-design/icons';

import ConfirmActionButton from '@components/ConfirmActionButton';
import { User } from '@api/userApi';

interface CardActionProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (Id: number) => void;
}

function CardAction({ user, onEdit, onDelete }: CardActionProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center 
                    bg-[rgba(176,168,168,0.6)] 
                    opacity-0 group-hover:opacity-100 transition-opacity 
                    rounded-l"
    >
      {/* Edit Button */}
      <div
        className="w-16 h-16 bg-[rgb(134,134,230)] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-900 transition-all duration-200 mx-2"
        onClick={() => onEdit?.(user)}
      >
        <EditOutlined className="text-white text-[1.7rem]" />
      </div>

      {/* Delete Button wrapped with reusable ConfirmActionButton */}
      <ConfirmActionButton
        title="Confirm Delete"
        description={`Are you sure you want to delete ${user.first_name}?`}
        onConfirm={() => onDelete?.(user?.id)}
      >
        <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-all duration-200 mx-2">
          <DeleteFilled className="text-white text-[1.7rem]" />
        </div>
      </ConfirmActionButton>
    </div>
  );
}

export default CardAction;
