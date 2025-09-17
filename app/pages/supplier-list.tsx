"use client"

import { useState } from "react";
import { Table, Card, Row, Col, Input, Select, Button, Layout, Menu, Space, Typography, theme } from "antd";
import { PlusOutlined, ExportOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import NewSupplierModal from "../components/NewSupplierModal";
import '@ant-design/v5-patch-for-react-19';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface Supplier {
    key: string;
    name: string;
    code: string;
    address: string;
    contact: string;
    status: string;
}

const data: Supplier[] = [
    {
        key: "1",
        name: "PT Setroom Indonesia",
        code: "STRM / 61000012 (Setroom)",
        address: "Jakarta, Indonesia",
        contact: "Albert Einstein",
        status: "Active",
    },
    {
        key: "2",
        name: "PT Suka Suka",
        code: "SKSK / 41000013 (Sukasuka)",
        address: "Bandung, Indonesia",
        contact: "James Lee",
        status: "In Progress",
    },
    {
        key: "3",
        name: "PT Angin Ribut",
        code: "ARIB / 41000014 (Angin)",
        address: "Denpasar, Indonesia",
        contact: "Maria Chen",
        status: "Blocked",
    },
];

export default function SupplierListPage() {
    const { token } = theme.useToken();
    const [statusFilter, setStatusFilter] = useState("Active");
    const [openModal, setOpenModal] = useState(false);


    const columns: ColumnsType<Supplier> = [
        { title: "#", dataIndex: "key", key: "key", width: 60 },
        {
            title: "Name",
            key: "name",
            render: (_, r) => (
                <>
                    <Text strong>{r.name}</Text>
                    <div style={{ color: token.colorTextSecondary, fontSize: 12 }}>
                        {r.code}
                    </div>
                </>
            ),
        },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Contact", dataIndex: "contact", key: "contact" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: status => {
                const color =
                    status === "Active"
                        ? "green"
                        : status === "In Progress"
                            ? "orange"
                            : "red";
                return <Text style={{ color }}>{status}</Text>;
            },
        },
    ];


    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Left sidebar */}
            <Sider width={240} style={{ background: "#fff" }}>
                <div style={{ padding: 16, fontWeight: "bold" }}>ALISA</div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["supplier-list"]}
                    items={[
                        { key: "dashboard", label: "Dashboard" },
                        {
                            key: "supplier",
                            label: "Supplier Management",
                            children: [
                                { key: "supplier-list", label: "Supplier List" },
                                { key: "review", label: "Review & Approvals" },
                                { key: "config", label: "Configurations" },
                            ],
                        },
                        { key: "funnel", label: "Funnel Management" },
                    ]}
                />
                <div style={{ position: "absolute", bottom: 20, width: "100%", textAlign: "center" }}>
                    <p>Help & Support</p>
                    <p>John Doe</p>
                </div>
            </Sider>

            {/* Main content */}
            <Layout>
                <Header style={{ background: "#fff", padding: "0 24px" }}>
                    <Space style={{ justifyContent: "space-between", width: "100%" }}>
                        <Title level={4} style={{ margin: 0 }}>Supplier List</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>New Supplier</Button>
                    </Space>
                </Header>
                <NewSupplierModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                />
                <Content style={{ padding: 24 }}>
                    {/* Stats Cards */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <Card title="Total Supplier" >
                                <strong>1,869</strong><br /><small>+8% vs last year</small>
                            </Card>
                        </Col>
                        <Col xs={24} md={6}>
                            <Card title="New Supplier" >
                                <strong>27</strong><br /><small>+1% vs last year</small>
                            </Card>
                        </Col>
                        <Col xs={24} md={6}>
                            <Card title="Avg Cost per Supplier">
                                <strong>Rp 320,3 Mn</strong><br /><small>-1% vs last year</small>
                            </Card>
                        </Col>
                        <Col xs={24} md={6}>
                            <Card title="Blocked Supplier" >
                                <strong>31</strong><br /><small>-4% vs last year</small>
                            </Card>
                        </Col>
                    </Row>

                    {/* Search + Filter */}
                    <Space style={{ margin: "24px 0", width: "100%", justifyContent: "space-between" }} wrap>
                        <Input.Search placeholder="Search Customer" style={{ width: 300 }} />
                        <Space>
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                options={[
                                    { value: "Active", label: "Active" },
                                    { value: "In Progress", label: "In Progress" },
                                    { value: "Blocked", label: "Blocked" },
                                ]}
                                style={{ width: 150 }}
                            />
                            <Button icon={<ExportOutlined />}>Export</Button>
                        </Space>
                    </Space>

                    {/* Table */}

                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 5 }}
                        rowHoverable
                        bordered={false}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}
