import React from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { createCourse } from "../api/courseService";

interface CourseFormProps {
  fetchCourses: () => void;
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

const CourseForm: React.FC<CourseFormProps> = ({ fetchCourses }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await createCourse(values);
      message.success("Course added successfully!");
      form.resetFields();
      fetchCourses();
    } catch (error) {
      message.error("Failed to add course. Please try again.");
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
        name="duration"
        label="Duration in months"
        rules={[{ required: true, message: "Please input duration!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
