import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, DatePicker, message } from "antd";
import { createStudent, updateStudent } from "../api/studentService";

interface StudentDrawerProps {
  open: boolean;
  onClose: () => void;
  student: { id: number; name: string; email: string; dob: Date } | null;
  fetchStudents: () => void;
}

const StudentDrawer: React.FC<StudentDrawerProps> = ({
  open,
  onClose,
  student,
  fetchStudents,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const updatedValues = {
      ...values,
      dob: values["dob"].format("YYYY-MM-DD"),
    };
    try {
      if (student) {
        await updateStudent(student.id, updatedValues);
        message.success("Student updated successfully!");
      } else {
        await createStudent(updatedValues);
        message.success("Student registered successfully!");
      }
      form.resetFields();
      fetchStudents();
      onClose();
    } catch (error) {
      message.error("Failed to save student. Please try again.");
    }
  };

  return (
    <Drawer
      title={student ? "Edit Student" : "Register Student"}
      placement="right"
      onClose={onClose}
      open={open}
    >
      <Form
        form={form}
        name="studentForm"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[
            {
              type: "object",
              required: true,
              message: "Please input the Date of Birth!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { required: true, message: "Please input the E-mail address!" },
            { type: "email", message: "Please input a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {student ? "Update" : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default StudentDrawer;
