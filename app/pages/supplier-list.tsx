"use client"

import { useState } from "react";
import { Table, Row, Col,  Button, Layout, Menu, Space, Typography, theme } from "antd";
import {  PlusOutlined,
  TeamOutlined,
  UserAddOutlined,
  StopOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  DollarCircleOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import NewSupplierModal from "../components/NewSupplierModal";
import StatsCard from "../components/Card";
import SearchFilterBar from "../components/SearchFilter";
import Link from "next/link";
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
  const [layoutType, setLayoutType] = useState<"grid" | "list">("list");


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
                <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
         
          fontWeight: "bold",
          fontSize: 18,
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <span>ALISA</span>
      </div>
                 <Menu
        mode="inline"
        defaultSelectedKeys={["supplier-list"]}
        defaultOpenKeys={["supplier-management"]}
        style={{ flex: 1, borderRight: 0 }}
        items={[
          {
            key: "dashboard",
            icon: <AppstoreOutlined />,
            label: <Link href="#">Dashboard</Link>,
          },
          {
            key: "supplier-management",
            icon: <TeamOutlined />,
            label: "Supplier Management",
            children: [
              { key: "supplier-dashboard", label: <Link href="#">Dashboard</Link> },
              { key: "supplier-list", label: <Link href="#">Supplier List</Link> },
              { key: "review-approvals", label: <Link href="#">Review & Approvals</Link> },
              { key: "configurations", label: <Link href="#">Configurations</Link> },
            ],
          },
          {
            key: "funnel-management",
            icon: <SettingOutlined />,
            label: "Funnel Management",
          },
        ]}
      />
                <div style={{ position: "absolute", bottom: 20, width: "100%", borderTop: "1px solid #e5e5e5", }}>
                    <div
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between" ? "center" : "space-between",
            cursor: "pointer",
          }}
        >
            
          <div style={{ display: "flex", alignItems: "center", gap: 8,  padding: "12px 24px",}}>
            <QuestionCircleOutlined />
            <Text strong>Help & Support</Text>
          </div>

        </div>
                     <div
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between" ? "center" : "space-between",
            cursor: "pointer",
          }}
        >
            
          <div style={{ display: "flex", alignItems: "center", gap: 8,  padding: "12px 24px",}}>
            <UserOutlined style={{ color: "red" }} />
            <Text strong>John Doe</Text>
          </div>

        </div>
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
                            <StatsCard
        title="Total Supplier"
        value="1,869"
        trend="+8% vs last year"
        trendColor="green"
        icon={<TeamOutlined />}
      />
                        </Col>
                        <Col xs={24} md={6}>
                          <StatsCard
        title="New Supplier"
        value="27"
        trend="+1% vs last year"
        trendColor="green"
        icon={<UserAddOutlined  />}
      />
                            
                        </Col>
                        <Col xs={24} md={6}>
                           

                             <StatsCard
        title="Avg Cost"
        value="Rp 320,3 Mn"
        trend="-1% vs last year"
        trendColor="red"
        icon={<DollarCircleOutlined  />}
      />
                        </Col>
                        <Col xs={24} md={6}>
                           
                            <StatsCard
        title="Blocked Supplier"
        value="31"
        trend="-4% vs last year"
        trendColor="red"
        icon={<StopOutlined  />}
      />
                        </Col>
                    </Row>

                    

                    {/* Search + Filter */}
                    <SearchFilterBar
        defaultStatus={statusFilter}
        onSearch={(val) => console.log("Search:", val)}
        onStatusChange={(val) => setStatusFilter(val)}
        onExport={() => console.log("Export triggered")}
        onLayoutChange={(layout) => setLayoutType(layout)}
      />
                   
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
