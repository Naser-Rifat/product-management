import React, { useState } from 'react';
import { Table, Button, Spin, message, Space, Image, Layout } from 'antd';
import { useGetProductsQuery } from '../../api/productHandlers';
import ProductDetailContent from './components/productDetailsContent';
import EditProductContent from './components/EditProductContent';
import GenericModal from '../common/modal';
import { Product } from '../../types/product';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

const { Content } = Layout;

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading } = useGetProductsQuery({ limit: pageSize, skip: (currentPage - 1) * pageSize });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

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

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    message.error('Failed to load products');
    return <div>Error loading products</div>;
  }

  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '50px',
      align: 'center',
    },
    {
      title: 'Image',
      key: 'thumbnail',
      align: 'center',
      width: '100px',
      render: (record: Product) => <Image width={50} src={record?.thumbnail} />,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Availability Status',
      dataIndex: 'availabilityStatus',
      key: 'availabilityStatus',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      render: (record: Product) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} type="primary" onClick={() => handleViewDetails(record.id)}>
            View Details
          </Button>
          <Button
            icon={<EditOutlined />}
            style={{ marginLeft: '8px' }}
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
      <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
        <Table
          loading={isLoading}
          bordered
          size="small"
          title={() => 'Products'}
          footer={() => `Total ${data?.total} products`}
          columns={columns}
          dataSource={data?.products}
          pagination={{
            total: data?.total,
            current: currentPage,
            pageSize: pageSize,
          }}
          rowKey="id"
          onChange={handleTableChange}
        />
      </Content>
      <GenericModal visible={isModalVisible} onClose={handleModalClose} title={modalTitle}>
        {modalContent}
      </GenericModal>
    </>
  );
};

export default ProductList;
