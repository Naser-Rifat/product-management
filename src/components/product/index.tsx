import React, { useState } from "react";
import {
  Table,
  Spin,
  message,
  TableColumnsType,
  Image,
  Space,
  Button,
} from "antd";
import { useGetProductsQuery } from "../../api/productHandlers";
import { Content } from "antd/es/layout/layout";
import { DataSourceItemType } from "antd/es/auto-complete";
import { Product } from "../../types/product";

import ProductDetailModal from "./components/modal";
import EditProductModal from "./components/editModal";

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery({ limit: 0, skip: 0 });
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  if (isLoading) return <Spin tip="Loading..." />;
  if (error) {
    message.error("Failed to load products");
    return <div>Error loading products</div>;
  }

  const handleViewDetails = (productId: number) => {
    setSelectedProductId(productId);
    setIsDetailModalVisible(true);
  };

  const handleEditProduct = (productId: number) => {
    setSelectedProductId(productId);
    setIsEditModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setSelectedProductId(null);
    setIsDetailModalVisible(false);
  };

  const handleEditModalClose = () => {
    setSelectedProductId(null);
    setIsEditModalVisible(false);
  };

  const columns: TableColumnsType<DataSourceItemType> = [
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
          <Button type="primary" onClick={() => handleViewDetails(record.id)}>
            View Details
          </Button>
          <Button
            style={{ marginLeft: "8px" }}
            onClick={() => handleEditProduct(record.id)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        // background: colorBgContainer,
        // borderRadius: borderRadiusLG,
      }}
    >
      <Table
        size="small"
        title={() => "Products"}
        columns={columns}
        dataSource={data?.products}
        pagination={{
          total: data?.total,
          pageSize: 10,
        }}
        rowKey="id"
      />

      <ProductDetailModal
        productId={selectedProductId}
        visible={isDetailModalVisible}
        onClose={handleDetailModalClose}
      />

      <EditProductModal
        productId={selectedProductId}
        visible={isEditModalVisible}
        onClose={handleEditModalClose}
      />
    </Content>
  );
};

export default ProductList;
