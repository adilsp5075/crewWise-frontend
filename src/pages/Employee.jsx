import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message, Popconfirm } from 'antd';
import moment from 'moment';
import { createEmployee, deleteEmployee, updateEmployee, getAllEmployees } from '../api/employeeApi';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployees();
      setEmployees(response);
    } catch (error) {
      message.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showAddEmployeeModal = () => {
    setVisible(true);
    form.resetFields();
  };

  const handleAddEmployee = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        date_of_joining: moment(values.date_of_joining).format('YYYY-MM-DD'),
      };
      const response = await createEmployee(formattedValues);
      setEmployees([...employees, response]);
      message.success('Employee added successfully');
      setVisible(false);
    } catch (error) {
      message.error('Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      setLoading(true);
      await deleteEmployee(employeeId);
      setEmployees(employees.filter((employee) => employee.employee_id !== employeeId));
      message.success('Employee deleted successfully');
    } catch (error) {
      message.error('Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmployee = async (employeeId, values) => {
    try {
      setLoading(true);
      await updateEmployee(employeeId, values);
      setEmployees(
        employees.map((employee) =>
          employee.employee_id === employeeId ? { ...employee, ...values } : employee
        )
      );
      message.success('Employee updated successfully');
    } catch (error) {
      message.error('Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Contact Number', dataIndex: 'contact_number', key: 'contact_number' },
    { title: 'Date of Joining', dataIndex: 'date_of_joining', key: 'date_of_joining' },
    { title: 'Years of Experience', dataIndex: 'years_of_experience', key: 'years_of_experience' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEditEmployee(record.employee_id, record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => handleDeleteEmployee(record.employee_id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showAddEmployeeModal}>
          Add Employee
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={employees}
        loading={loading}
        locale={{ emptyText: 'No employee here' }}
      />
      <Modal
        title="Add Employee"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEmployee}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="email" name="email" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
          <Form.Item label="Contact Number" name="contact_number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date of Joining" name="date_of_joining" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Years of Experience"
            name="years_of_experience"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employee;
