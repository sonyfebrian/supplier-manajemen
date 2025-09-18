import { Input, Select, Button, Space, Tooltip } from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";

interface Props {
  onSearch?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onExport?: () => void;
  onLayoutChange?: (layout: "grid" | "list") => void;
  defaultStatus?: string;
}

export default function SearchFilterBar({
  onSearch,
  onStatusChange,
  onExport,
  onLayoutChange,
  defaultStatus,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 24,
        marginTop: 24,

      }}
    >
      {/* Search & Filter */}
      <Space>
        <Input.Search
          placeholder="Search Customer"
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={onSearch}
          style={{ width: 260 }}
        />
        <Select
          defaultValue={defaultStatus || "Active"}
          style={{ width: 140 }}
          onChange={onStatusChange}
          options={[
            { value: "Active", label: "Active" },
            { value: "In Progress", label: "In Progress" },
            { value: "Blocked", label: "Blocked" },
          ]}
        />
      </Space>

      {/* Actions: Export & Layout Toggle */}
      <Space>
        <Button icon={<ExportOutlined />} onClick={onExport}>
          Export
        </Button>
        <Tooltip title="Grid View">
          <Button
            icon={<AppstoreOutlined />}
            onClick={() => onLayoutChange?.("grid")}
          />
        </Tooltip>
        <Tooltip title="List View">
          <Button
            icon={<BarsOutlined />}
            onClick={() => onLayoutChange?.("list")}
          />
        </Tooltip>
      </Space>
    </div>
  );
}
