import React from "react";
import { Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { deleteGuardian } from "../api/guardianService";

interface DataType {
  key: string;
  id: number;
  name: string;
  contactNo: string;
}

interface GuardiansTableProps {
  guardians: DataType[];
  fetchGuardians: () => void;
}

const GuardiansTable: React.FC<GuardiansTableProps> = ({
  guardians,
  fetchGuardians,
}) => {
  const handleDelete = async (guardianId: number) => {
    try {
      await deleteGuardian(guardianId);
      message.success("Guardian deleted successfully.");
      fetchGuardians();
    } catch (error) {
      message.error("Failed to delete guardian.");
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
      title: "Contact Number",
      dataIndex: "contactNo",
      key: "contactNo",
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
    <Table<DataType> columns={columns} dataSource={guardians} rowKey="id" />
  );
};

export default GuardiansTable;
