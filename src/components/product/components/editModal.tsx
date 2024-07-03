import React from 'react';
import { Modal, Form, Input, Button, Select, Space, Spin, message } from 'antd';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../api/productHandlers';
import { useGetCategoriesQuery } from '../../../api/categoryHandlers';
import { Product } from '../../../types/product';

interface EditProductModalProps {
  productId: number | null;
  visible: boolean;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ productId, visible, onClose }) => {
  const { data: product, error: productError, isLoading: productLoading } = useGetProductByIdQuery(productId!, { skip: productId === null });

  console.log("sddd")
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery( { limit: 0, skip: 0 } );
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();

  if (productLoading || categoriesLoading) return <Spin tip="Loading..." />;
  if (productError || categoriesError) {
    message.error('Failed to load data');
    return <div>Error loading data</div>;
  }

  const onFinish = async (values: Partial<Product>) => {
    console.log('Updated Product:', values);
    await updateProduct({ id: Number(productId), ...values });
    message.success('Product updated successfully');
    onClose();
  };

  return (
    <Modal title="Edit Product" visible={visible} onCancel={onClose} footer={null}>
      {product && (
        <Form initialValues={product} onFinish={onFinish} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              {categories?.map((category: string) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="reviews" label="Reviews">
            <Form.List name="reviews">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'review']}
                        fieldKey={[field.fieldKey, 'review']}
                        rules={[{ required: true, message: 'Please input review' }]}
                      >
                        <Input placeholder="Review" />
                      </Form.Item>
                      <Button onClick={() => remove(field.name)}>Remove</Button>
                    </Space>
                  ))}
                  <Button onClick={() => add()}>Add Review</Button>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={updateLoading}>
              Update Product
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditProductModal;
