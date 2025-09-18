// 
"use client"
import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Tabs,
  Table,
  Button,
  Radio,
  Space,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface AddressData {
  key: string;
  name: string;
  address: string;
  isMain: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewSupplierModal({ open, onClose }: Props) {
  const [form] = Form.useForm();
  const [addresses, setAddresses] = useState<AddressData[]>([
    { key: "1", name: "Head Office", address: "Fatmawati Raya St, 123", isMain: true },
    { key: "2", name: "Branch Office", address: "Ciawi, 99", isMain: false },
  ]);

  const setMainAddress = (key: string) => {
    setAddresses(prev => prev.map(item => ({ ...item, isMain: item.key === key })));
  };

  const addAddress = () => {
    const newKey = String(addresses.length + 1);
    setAddresses(prev => [
      ...prev,
      { key: newKey, name: `New Office ${newKey}`, address: "", isMain: false },
    ]);
  };

  const addressColumns: ColumnsType<AddressData> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Main",
      key: "main",
      align: "center",
      render: (_, record) => (
        <Radio
          checked={record.isMain}
          onChange={() => setMainAddress(record.key)}
        />
      ),
    },
  ];

  const handleSave = async () => {
    const values = await form.validateFields();
    console.log("Form values:", values, "Addresses:", addresses);
    onClose();
  };

  return (
    <Modal
      open={open}
      title="New Supplier"
      onCancel={onClose}
      width={900}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Space align="start" style={{ width: "100%", marginBottom: 16 }} size={24}>
          {/* Upload Logo */}
          <Upload listType="picture-card" maxCount={1}>
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Logo</div>
            </div>
          </Upload>

          {/* Supplier Name / Nick Name */}
          <Space direction="vertical" style={{ flex: 1, width: "100%" }}>
            <div style={{ flex: 1 }}>
      <Form.Item
        label="Supplier Name"
        name="supplierName"
        rules={[{ required: true, message: "Supplier name is required" }]}
      >
        <Input placeholder="PT Setroom Indonesia" />
      </Form.Item>

      <Form.Item
        label="Nick Name"
        name="nickName"
        style={{ width: "50%" }}  // half width like wireframe
      >
        <Input placeholder="Setroom" />
      </Form.Item>
    </div>
          </Space>
        </Space>

        {/* Tabs */}
        <Tabs
          defaultActiveKey="address"
          type="card"
          items={[
            {
              key: "address",
              label: "Address",
              children: (
                <>
                  <Button
                    icon={<PlusOutlined />}
                    style={{ marginBottom: 12 }}
                    onClick={addAddress}
                  >
                    Add Address
                  </Button>
                  <Table
                    columns={addressColumns}
                    dataSource={addresses}
                    pagination={false}
                    rowKey="key"
                    bordered
                  />
                </>
              ),
            },
            { key: "contacts", label: "Contacts", children: <p>Contacts form goes here</p> },
            { key: "groups", label: "Groups", children: <p>Groups form goes here</p> },
            { key: "materials", label: "Material List", children: <p>Material list goes here</p> },
            { key: "others", label: "Others", children: <p>Other details go here</p> },
          ]}
        />
      </Form>
    </Modal>
  );
}
