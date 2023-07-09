import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message,Select } from "antd";
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getAllDepartments,
  getManagers,
} from "../api/departmentApi";

const Department = () => {
  // State variables
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [managers, setManagers] = useState([]);

  const [form] = Form.useForm();

  // Fetch departments from the API
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await getAllDepartments();
      setDepartments(response);
    } catch (error) {
      message.error("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await getManagers();
        setManagers(response);
      } catch (error) {
        message.error('Failed to fetch managers');
      }
    };
  
    fetchManagers();
  }, []);
  
  

    // Call fetchDepartments on component mount
    useEffect(() => {
      fetchDepartments();
    }, []);

    // Show the modal to add a new department
    const showAddDepartmentModal = () => {
      setVisible(true);
      form.resetFields();
    };

    // Handle form submission to add a new department
    const handleAddDepartment = async (values) => {
      try {
        setLoading(true);
        const response = await createDepartment(values);
        setDepartments([...departments, response]);
        message.success("Department added successfully");
        setVisible(false);
      } catch (error) {
        message.error("Failed to add department");
      } finally {
        setLoading(false);
      }
    };

    // Handle deletion of a department
    const handleDeleteDepartment = async (departmentId) => {
      try {
        setLoading(true);
        await deleteDepartment(departmentId);
        setDepartments(
          departments.filter((department) => department.id !== departmentId)
        );
        message.success("Department deleted successfully");
      } catch (error) {
        message.error("Failed to delete department");
      } finally {
        setLoading(false);
      }
    };

    // Define the table columns
    const columns = [
      { title: "Manager", dataIndex: "manager_name", key: "manager_name" },
      {
        title: "Manager Email",
        dataIndex: "manager_email",
        key: "manager_email",
      },
      {
        title: "Manager Phone",
        dataIndex: "manager_contact_number",
        key: "manager_contact_number",
      },
      { title: "Department Name", dataIndex: "name", key: "name" },
      { title: "Location", dataIndex: "location", key: "location" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <span>
            <Button
              type="link"
              onClick={() => handleEditDepartment(record.id, record)}
            >
              Edit
            </Button>
            <Button
              type="link"
              onClick={() => handleDeleteDepartment(record.id)}
            >
              Delete
            </Button>
          </span>
        ),
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={showAddDepartmentModal}>
            Add Department
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={departments}
          loading={loading}
          locale={{ emptyText: "No department here" }}
        />
        <Modal
          title="Add Department"
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAddDepartment}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Manager"
              name="manager_id"
              rules={[{ required: true }]}
            >
              <Select>
                {managers.map((manager) => (
                  <Select.Option key={manager.id} value={manager.id}>
                    {manager.name}
                  </Select.Option>
                ))}
              </Select>
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


export default Department;
