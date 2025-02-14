import React from "react";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { createLecturer } from "../api/lecturerService";

interface LecturerFormProps {
  fetchLecturers: () => void;
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

const LecturerForm: React.FC<LecturerFormProps> = ({ fetchLecturers }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await createLecturer(values);
      message.success("Lecturer added successfully!");
      form.resetFields();
      fetchLecturers();
    } catch (error) {
      message.error("Failed to add lecturer. Please try again.");
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
        name="email"
        label="E-mail"
        rules={[
          { required: true, message: "Please input your E-mail address!" },
          { type: "email", message: "Please input a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please input your Gender!" }]}
      >
        <Select>
          <Select.Option value="MALE">Male</Select.Option>
          <Select.Option value="FEMALE">Female</Select.Option>
          <Select.Option value="OTHER">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LecturerForm;
