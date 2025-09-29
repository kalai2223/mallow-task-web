import React, { useEffect } from 'react';

import { Modal, Form } from 'antd';

import InputComponent from '../../components/InputComponent';
import Notify from '../../components/Notify';

interface UserFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any; // undefined for Add, object for Edit
  title?: string;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  onCancel,
  onSubmit,
  initialValues,
  title = 'User Form',
  visible,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((_info) => {
        Notify({ type: 'error', content: 'Validate Failed:' });
        // console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title={<span className="text-lg font-bold">{title}</span>}
      okText="Submit"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <InputComponent
          name="first_name"
          label="First Name"
          placeholder="Please enter first name"
          rules={[{ required: true, message: 'First name is required' }]}
        />

        <InputComponent
          name="last_name"
          label="Last Name"
          placeholder="Please enter last name"
          rules={[{ required: true, message: 'Last name is required' }]}
        />

        <InputComponent
          name="email"
          label="Email"
          placeholder="Please enter email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Invalid email address' },
          ]}
        />

        <InputComponent
          name="avatar"
          label="Profile Image Link"
          placeholder="Please enter profile image link"
          rules={[{ required: true, message: 'Profile image link is required' }]}
        />
      </Form>
    </Modal>
  );
};

export default UserFormModal;
