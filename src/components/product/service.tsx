import { Button, Image, Space, TableColumnsType } from "antd";
import { DataSourceItemType } from "antd/es/auto-complete";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

export const columns: TableColumnsType<DataSourceItemType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "image",
    key: "thumbnail",
    render: (record: Product) => {
      return <Image width={100} src={record?.thumbnail} />;
    },
  },
  {
    title: "Name",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Availability Status",
    dataIndex: "availabilityStatus",
    key: "availabilityStatus",
  },
  {
    title: "Actions",
    key: "actions",
    fixed: "right",
    render: (record: Product) => (
      <Space size={"middle"}>
        <Link to={`/products/${record?.id}`}>
          <Button icon={<EyeOutlined />} type="default">View Details</Button>
        </Link>
        <Link to={`/products/${record?.id}`}>
          <Button icon={<EditOutlined />} type="default">Edit</Button>
        </Link>
      </Space>
    ),
  },
];
