import React, { useEffect, useState } from "react";
import StudentsTable from "./StudentsTable";
import Registration from "./Registration";
import { getStudents } from "../api/studentService";
import { Typography } from "antd";

const { Title } = Typography;

const Students = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <Title level={4}>Student Registration</Title>
      <Registration fetchStudents={fetchStudents} />
      <Title level={4}>Student List</Title>
      <StudentsTable students={students} fetchStudents={fetchStudents} />
    </div>
  );
};

export default Students;
