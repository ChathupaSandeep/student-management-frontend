import React from "react";
import StudentsTable from "./StudentsTable";
import Registration from "./Registration";
import { Typography } from "antd";

const { Title } = Typography;

const Courses = () => {
  return (
    <>
      <Title level={2}>Courses</Title>
      <Registration />
      <StudentsTable />;
    </>
  );
};

export default Courses;
