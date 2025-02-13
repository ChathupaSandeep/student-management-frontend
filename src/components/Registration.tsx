import React from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import { createStudent } from "../api/studentService";

interface RegistrationProps {
  fetchStudents: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 16 },
  },
};

const Registration: React.FC<RegistrationProps> = ({ fetchStudents }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const updatedValues = {
      ...values,
      dob: values["dob"].format("YYYY-MM-DD"),
    };
    try {
      await createStudent(updatedValues);
      message.success("Student registered successfully!");
      form.resetFields();
      fetchStudents();
    } catch (error) {
      message.error("Failed to register student. Please try again.");
    }
  };

  return (
    <Form
      form={form}
      {...formItemLayout}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input your name!" }]}
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
            message: "Please input your Date of Birth!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { required: true, message: "Please input your E-mail address!" },
          { type: "email", message: "Please input a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;
