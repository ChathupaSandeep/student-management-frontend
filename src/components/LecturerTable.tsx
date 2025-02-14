import React from "react";
import { Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { deleteLecturer } from "../api/lecturerService";

interface DataType {
  key: string;
  id: number;
  name: string;
  email: string;
  gender: string;
}

interface LecturersTableProps {
  lecturers: DataType[];
  fetchLecturers: () => void;
}

const LecturersTable: React.FC<LecturersTableProps> = ({
  lecturers,
  fetchLecturers,
}) => {
  const handleDelete = async (lecturerId: number) => {
    try {
      await deleteLecturer(lecturerId);
      message.success("Lecturer deleted successfully.");
      fetchLecturers();
    } catch (error) {
      message.error("Failed to delete lecturer.");
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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
    <Table<DataType> columns={columns} dataSource={lecturers} rowKey="id" />
  );
};

export default LecturersTable;
