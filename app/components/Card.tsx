import { Card, Typography, Space } from "antd";
import { ReactNode } from "react";

const { Title, Text } = Typography;

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string; // e.g. "+8% vs last year"
  trendColor?: string; // e.g. "green", "red"
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  trendColor = "green",
}: StatsCardProps) {
  return (
    <Card
      style={{
        borderRadius: 12,
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
      styles={{
    body: { padding: 16 },
  }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size={4}>
        <Text type="secondary">{title}</Text>
        <Space align="center" style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={3} style={{ margin: 0 }}>
            {value}
          </Title>
          <div style={{ fontSize: 28, color: "#666" }}>{icon}</div>
        </Space>
        {trend && (
          <Text style={{ color: trendColor, fontSize: 13 }}>{trend}</Text>
        )}
      </Space>
    </Card>
  );
}
