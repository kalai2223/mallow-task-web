import React from 'react';

import { Card, Avatar, Col, Row } from 'antd';

import CardAction from './CardAction';
import { User } from '@api/userApi';

interface CardViewProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}
const CardView = ({ users, onEdit, onDelete }: CardViewProps) => {
  return (
    <div className="bg-gray-100 rounded-l p-4 w-full h-full relative">
      <Row gutter={[16, 16]}>
        {users.map((user: User) => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <div className="relative group w-full">
              <Card hoverable className="text-center rounded-2xl overflow-hidden shadow-lg">
                <Avatar
                  src={user.avatar}
                  size={128}
                  className="mx-auto -mt-16 border-4 border-white shadow-md"
                />

                <h3 className="mt-4 text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </h3>

                <p className="text-sm text-gray-500 text-[1rem]">{user.email}</p>
              </Card>

              <CardAction user={user} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardView;
