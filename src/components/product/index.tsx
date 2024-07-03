import React, { useState } from 'react';
import { Table, Button, Spin, message, Row, Col, Space, TableColumnsType, Image } from 'antd';
import { useGetProductsQuery } from '../../api/productHandlers';
import ProductDetailContent from './components/productDetailsContent';
import EditProductContent from './components/EditProductContent';
import GenericModal from '../common/modal';
import { Product } from '../../types/product';
import { DataSourceItemType } from 'antd/es/auto-complete';


const ProductList: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery({ limit: 10, skip: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  if (isLoading) return <Spin tip="Loading..." />;
  if (error) {
    message.error('Failed to load products');
    return <div>Error loading products</div>;
  }

  const handleViewDetails = (productId: number) => {
    setModalTitle('Product Details');
    setModalContent(<ProductDetailContent productId={productId} />);
    setIsModalVisible(true);
  };

  const handleEditProduct = (productId: number) => {
    setModalTitle('Edit Product');
    setModalContent(<EditProductContent productId={productId} onClose={handleModalClose} />);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
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
    <>
      <Row justify="center">
        <Col span={20}>
          <Table
            columns={columns}
            dataSource={data?.products}
            pagination={{
              total: data?.total,
              pageSize: 10,

            }}
            rowKey="id"
          />
        </Col>
      </Row>
      <GenericModal
        visible={isModalVisible}
        onClose={handleModalClose}
        title={modalTitle}
      >
        {modalContent}
      </GenericModal>
    </>
  );
};

export default ProductList;
