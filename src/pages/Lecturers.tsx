import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import LecturersTable from "../components/LecturerTable";
import { getLecturers } from "../api/lecturerService";
import LecturerForm from "../components/LecturerForm";

const { Title } = Typography;

const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);

  const fetchLecturers = async () => {
    try {
      const data = await getLecturers();
      setLecturers(data);
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  return (
    <div>
      <Title level={4}>Lecturer Registration</Title>
      <LecturerForm fetchLecturers={fetchLecturers} />
      <Title level={4}>Lecturer List</Title>
      <LecturersTable lecturers={lecturers} fetchLecturers={fetchLecturers} />
    </div>
  );
};

export default Lecturers;
