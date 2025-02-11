import React from "react";
import StudentsTable from "./StudentsTable";
import Registration from "./Registration";
import { Typography } from "antd";

const { Title } = Typography;

const Students = () => {
  return (
    <>
      <Title level={2}>Students</Title>
      <Registration />
      <StudentsTable />;
    </>
  );
};

export default Students;
