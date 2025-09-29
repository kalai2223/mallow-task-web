import { Table, Avatar, Button, Space } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import type { User } from '@api/userApi';
import ConfirmActionButton from '@components/ConfirmActionButton';

interface TableViewProps {
  users: User[];
  paginationProps: {
    current: number; // number instead of string
    pageSize: number;
    total: number;
  };
  onChangeHandler: (current: number) => void; // number
  onEdit: (user: User) => void;
  onDelete: (id: number) => Promise<void>;
}

const TableView: React.FC<TableViewProps> = ({
  users,
  paginationProps,
  onChangeHandler,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: User) => (
        <Space>
          <Button className="rounded" type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <ConfirmActionButton
            title="Confirm Delete"
            description={`Are you sure you want to delete ${record.first_name}?`}
            onConfirm={() => onDelete(record.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </ConfirmActionButton>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={{
        current: paginationProps.current,
        pageSize: paginationProps.pageSize,
        total: paginationProps.total,
      }}
      onChange={(pagination: TablePaginationConfig) => {
        if (pagination.current) onChangeHandler(pagination.current);
      }}
    />
  );
};

export default TableView;
