import React, { useState } from "react";
import { Button, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { deleteCourse } from "../api/courseService";
import LecturerDrawer from "./LecturerDrawer";

interface DataType {
  key: string;
  id: number;
  name: string;
  duration: number;
  lecturerName: string;
}

interface CoursesTableProps {
  courses: DataType[];
  fetchCourses: () => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({
  courses,
  fetchCourses,
}) => {
  const [lecturerDrawerOpen, setLecturerDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<DataType | null>(null);

  const handleDelete = async (courseId: number) => {
    try {
      await deleteCourse(courseId);
      message.success("Course deleted successfully.");
      fetchCourses();
    } catch (error) {
      message.error("Failed to delete course.");
    }
  };

  const openLecturerDrawer = (course: DataType) => {
    setSelectedCourse(course);
    setLecturerDrawerOpen(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Lecturer",
      dataIndex: "lecturerName",
      key: "lecturerName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <Button
            onClick={() => handleDelete(record.id)}
            style={{ color: "red" }}
          >
            Delete
          </Button>
          <Button
            color="green"
            variant="solid"
            onClick={() => openLecturerDrawer(record)}
          >
            Assign Lecturer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<DataType> columns={columns} dataSource={courses} rowKey="id" />

      <LecturerDrawer
        open={lecturerDrawerOpen}
        onClose={() => setLecturerDrawerOpen(false)}
        course={selectedCourse}
        fetchCourses={fetchCourses}
      />
    </>
  );
};

export default CoursesTable;
