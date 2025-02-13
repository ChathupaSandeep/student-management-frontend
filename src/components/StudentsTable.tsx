import React from "react";
import { Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import { deleteStudent } from "../api/studentService";

interface DataType {
  key: string;
  id: number;
  name: string;
  dob: Date;
  email: string;
  courses: number[];
}

interface StudentsTableProps {
  students: DataType[];
  fetchStudents: () => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  fetchStudents,
}) => {
  const handleDelete = async (studentId: number) => {
    try {
      await deleteStudent(studentId);
      message.success("Student deleted successfully.");
      fetchStudents(); // Refresh student list
    } catch (error) {
      message.error("Failed to delete student.");
    }
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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
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
          <a>Edit</a>
          <a onClick={() => handleDelete(record.id)} style={{ color: "red" }}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Table<DataType> columns={columns} dataSource={students} rowKey="id" />
  );
};

export default StudentsTable;
