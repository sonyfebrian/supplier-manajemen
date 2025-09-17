"use client"

import { useState } from "react";
import {
    Modal,
    Form,
    Input,
    Tabs,
    Table,
    Button,
    Upload,
    Radio,
    Space
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
        setAddresses(prev =>
            prev.map(item => ({ ...item, isMain: item.key === key }))
        );
    };

    const addressColumns: ColumnsType<AddressData> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Main",
            key: "main",
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
            width={800}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Space align="start" style={{ width: "100%", marginBottom: 16 }}>
                    {/* Upload logo */}
                    <Upload listType="picture-card" maxCount={1}>
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Logo</div>
                        </div>
                    </Upload>

                    <Space direction="vertical" style={{ flex: 1 }}>
                        <Form.Item
                            name="supplierName"
                            label="Supplier Name"
                            rules={[{ required: true, message: "Supplier name is required" }]}
                        >
                            <Input placeholder="e.g. PT Setroom Indonesia" />
                        </Form.Item>
                        <Form.Item name="nickName" label="Nick Name">
                            <Input placeholder="e.g. Setroom" />
                        </Form.Item>
                    </Space>
                </Space>

                {/* Tabs for Address, Contacts, Groups, etc */}
                <Tabs
                    defaultActiveKey="address"
                    items={[
                        {
                            key: "address",
                            label: "Address",
                            children: (
                                <>
                                    <Button
                                        type="dashed"
                                        icon={<PlusOutlined />}
                                        style={{ marginBottom: 12 }}
                                        onClick={() =>
                                            setAddresses(prev => [
                                                ...prev,
                                                { key: String(prev.length + 1), name: "New Office", address: "", isMain: false },
                                            ])
                                        }
                                    >
                                        Add Address
                                    </Button>
                                    <Table
                                        columns={addressColumns}
                                        dataSource={addresses}
                                        pagination={false}
                                        bordered
                                    />
                                </>
                            ),
                        },
                        { key: "contacts", label: "Contacts", children: <p>Contacts content</p> },
                        { key: "groups", label: "Groups", children: <p>Groups content</p> },
                        { key: "material", label: "Material List", children: <p>Material list content</p> },
                        { key: "others", label: "Others", children: <p>Other content</p> },
                    ]}
                />
            </Form>
        </Modal>
    );
}
