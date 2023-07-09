import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Card } from "antd";

const { Title, Text, Paragraph } = Typography;

const Home = () => {
  return (
    <div>
      <Card>
        <Title level={2}>Welcome to crewWise</Title>
        <Paragraph>
          crewWise is an Employee Management System that allows you to perform
          CRUD operations on employees and departments. You can view and manage
          employee information, department details, and assign employees to
          departments. The system also provides functionality to promote eligible
          employees to manager positions based on experience criteria.
        </Paragraph>
        <div style={{ marginBottom: 16 }}>
          <Link to="/employee">
            <Button type="primary" style={{ marginRight: 16 }}>
              Employee Table
            </Button>
          </Link>
          <Link to="/department">
            <Button type="primary" style={{ marginRight: 16 }}>
              Department Table
            </Button>
          </Link>
          <Link to="/department-assignment">
            <Button type="primary">Department Assignment</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
