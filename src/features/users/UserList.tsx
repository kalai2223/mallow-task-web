import React, { useState, useEffect } from 'react';
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Radio, RadioChangeEvent } from 'antd';

import CardView from './CardView';
import TableView from './TableView';
import UserFormModal from './UserFormModel';
import { fetchUsers, addUser, editUser, deleteUser, setSearchTerm } from './userSlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../components/Loader';
import Notify from '../../components/Notify';
import SearchBar from '../../components/SearchBarComponent';
import type { User } from '../../api/userApi';

const UserListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error, page, perPage, total } = useAppSelector((state) => state.users);

  const [viewType, setViewType] = useState<'table' | 'card'>('table');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers({ page: '1' }));
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleSubmit = async (values: Partial<User>) => {
    try {
      if (editingUser) {
        await dispatch(editUser({ id: editingUser.id, userData: values })).unwrap();
      } else {
        await dispatch(addUser(values)).unwrap();
      }
      Notify({ type: 'success', content: 'User saved successfully!' });
      setModalVisible(false);
      dispatch(fetchUsers({ page }));
    } catch (err: any) {
      Notify({ type: 'error', content: `Error while saving user: ${err.message || err}` });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      Notify({ type: 'success', content: 'User deleted successfully!' });
      dispatch(fetchUsers({ page }));
    } catch (err: any) {
      Notify({ type: 'error', content: `Error while deleting user: ${err.message || err}` });
    }
  };

  const onChangeTableHandler = (current: number) => {
    dispatch(fetchUsers({ page: current.toString() }));
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col  w-[90%] h-[80%] my-2 mx-2.5 p-6 bg-white shadow rounded overflow-hidden">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex justify-between  m-[5px]">
            <h2 className="text-2xl font-bold my-2">Users</h2>
            <div className="flex flex-row gap-2">
              <SearchBar placeholder="input search text" onSearch={handleSearch} />
              <Button
                type="primary"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                onClick={handleAddUser}
              >
                Create User
              </Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex justify-start w-full mt-2">
            <Radio.Group
              value={viewType}
              onChange={(e: RadioChangeEvent) => setViewType(e.target.value)}
              optionType="button"
            >
              <Radio.Button value="table">
                <span className="flex justify-between gap-2">
                  <TableOutlined />
                  Table View
                </span>
              </Radio.Button>
              <Radio.Button value="card">
                <span className="flex justify-between gap-2">
                  <UnorderedListOutlined />
                  Card View
                </span>
              </Radio.Button>
            </Radio.Group>
          </div>

          {/* Loader + Content */}
          <Loader spinning={loading} tip={loading ? 'Loading users...' : 'Processing...'}>
            {viewType === 'card' ? (
              <CardView users={users} onEdit={handleEditUser} onDelete={handleDelete} />
            ) : (
              <TableView
                users={users}
                paginationProps={{ current: +page, pageSize: perPage, total }}
                onChangeHandler={onChangeTableHandler}
                onEdit={handleEditUser}
                onDelete={handleDelete}
              />
            )}
          </Loader>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <UserFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={editingUser || undefined}
        title={editingUser ? 'Edit User' : 'Add User'}
      />
    </div>
  );
};

export default UserListPage;
