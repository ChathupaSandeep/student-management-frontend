import React from "react";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { createGuardian } from "../api/guardianService";

interface GuardianFormProps {
  fetchGuardians: () => void;
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

const GuardianForm: React.FC<GuardianFormProps> = ({ fetchGuardians }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await createGuardian(values);
      message.success("Guardian added successfully!");
      form.resetFields();
      fetchGuardians();
    } catch (error) {
      message.error("Failed to add guardian. Please try again.");
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
        name="contactNo"
        label="Contact Number"
        rules={[{ required: true, message: "Please input your name!" }]}
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

export default GuardianForm;
