import React, { useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import { deleteStudent } from "../api/studentService";
import CoursesDrawer from "./CoursesDrawer";
import GuardianDrawer from "./GuardianDrawer";
import StudentDrawer from "./StudentDrawer";

interface DataType {
  key: string;
  id: number;
  name: string;
  dob: Date;
  age: number;
  email: string;
  guardianName: string;
  courses: string[];
}

interface StudentsTableProps {
  students: DataType[];
  fetchStudents: () => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  fetchStudents,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [guardianDrawerOpen, setGuardianDrawerOpen] = useState(false);
  const [studentDrawerOpen, setStudentDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<DataType | null>(null);

  const handleDelete = async (studentId: number) => {
    try {
      await deleteStudent(studentId);
      message.success("Student deleted successfully.");
      fetchStudents();
    } catch (error) {
      message.error("Failed to delete student.");
    }
  };

  const openDrawer = (student: DataType) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const openGuardianDrawer = (student: DataType) => {
    setSelectedStudent(student);
    setGuardianDrawerOpen(true);
  };

  const openStudentDrawer = (student: DataType | null) => {
    setSelectedStudent(student);
    setStudentDrawerOpen(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Guardian",
      dataIndex: "guardianName",
      key: "guardianName",
    },
    {
      title: "Courses",
      key: "courses",
      dataIndex: "courses",
      render: (_, { courses }) => (
        <>
          {courses.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => openStudentDrawer(record)}>Edit</Button>
          <Button
            color="red"
            onClick={() => handleDelete(record.id)}
            style={{ color: "red" }}
          >
            Delete
          </Button>
          <Button
            color="cyan"
            variant="solid"
            onClick={() => openDrawer(record)}
          >
            Enroll/Unenroll Courses
          </Button>
          <Button
            color="green"
            variant="solid"
            onClick={() => openGuardianDrawer(record)}
          >
            Update Guardian
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<DataType> columns={columns} dataSource={students} rowKey="id" />

      <CoursesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        student={selectedStudent}
        fetchStudents={fetchStudents}
      />

      <GuardianDrawer
        open={guardianDrawerOpen}
        onClose={() => setGuardianDrawerOpen(false)}
        student={selectedStudent}
        fetchStudents={fetchStudents}
      />

      <StudentDrawer
        open={studentDrawerOpen}
        onClose={() => setStudentDrawerOpen(false)}
        student={selectedStudent}
        fetchStudents={fetchStudents}
      />
    </>
  );
};

export default StudentsTable;
