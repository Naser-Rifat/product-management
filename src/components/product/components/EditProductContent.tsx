import React from 'react';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../api/productHandlers';
import { useGetCategoriesQuery } from '../../../api/categoryHandlers';
import { Product } from '../../../types/product';


interface EditProductContentProps {
  productId: number;
  onClose: () => void;
}

const EditProductContent: React.FC<EditProductContentProps> = ({ productId, onClose }) => {
  const { data: product, error: productError, isLoading: productLoading } = useGetProductByIdQuery(productId);
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery( { limit: 0, skip: 0 } );
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();

  if (productLoading || categoriesLoading) return <Spin tip="Loading..." />;
  if (productError || categoriesError) {
    message.error('Failed to load data');
    return <div>Error loading data</div>;
  }

  const onFinish = async (values: Partial<Product>) => {
    console.log('Updated Product:', values);
    await updateProduct({ id: productId, ...values });
    message.success('Product updated successfully');
    onClose();
  };
  return (
    product && (
      <Form initialValues={product} onFinish={onFinish} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select>
            {categories?.map((category: { name: string; slug: string }) => (
              <Select.Option key={category?.slug} value={category?.slug}>
                {category?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="discountPercentage" label="Discount Percentage" rules={[{ required: true }]}>
          <Input type="number" step="0.01" />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
          <Input type="number" step="0.1" />
        </Form.Item>
        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        {/* <Form.Item name="tags" label="Tags">
          <Select mode="tags">
            {product.tags.map(tag => (
              <Select.Option key={tag} value={tag}>
                {tag}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}
        <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}
        {/* <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item> */}
        {/* <Form.Item label="Dimensions">
          <Space>
            <Form.Item name={['dimensions', 'width']} label="Width" rules={[{ required: true }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
            <Form.Item name={['dimensions', 'height']} label="Height" rules={[{ required: true }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
            <Form.Item name={['dimensions', 'depth']} label="Depth" rules={[{ required: true }]}>
              <Input type="number" step="0.01" />
            </Form.Item>
          </Space>
        </Form.Item> */}
        {/* <Form.Item name="warrantyInformation" label="Warranty Information">
          <Input />
        </Form.Item>
        <Form.Item name="shippingInformation" label="Shipping Information">
          <Input />
        </Form.Item>
        <Form.Item name="availabilityStatus" label="Availability Status">
          <Input />
        </Form.Item>
        <Form.Item name="returnPolicy" label="Return Policy">
          <Input />
        </Form.Item>
        <Form.Item name="minimumOrderQuantity" label="Minimum Order Quantity">
          <Input type="number" />
        </Form.Item> */}
     
        {/* <Form.Item name="reviews" label="Reviews">
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'review']}
                      rules={[{ required: true, message: 'Please input review' }]}
                    >
                      <Input placeholder="Review" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'rating']}
                      rules={[{ required: true, message: 'Please input rating' }]}
                    >
                      <Input type="number" step="0.1" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'reviewerName']}
                      rules={[{ required: true, message: 'Please input reviewer name' }]}
                    >
                      <Input placeholder="Reviewer Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'reviewerEmail']}
                      rules={[{ required: true, message: 'Please input reviewer email' }]}
                    >
                      <Input placeholder="Reviewer Email" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'date']}
                      rules={[{ required: true, message: 'Please input review date' }]}
                    >
                      <Input placeholder="Date" />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)}>Remove</Button>
                  </Space>
                ))}
                <Button onClick={() => add()}>Add Review</Button>
              </>
            )}
          </Form.List>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={updateLoading}>
            Update Product
          </Button>
        </Form.Item>
      </Form>
    )
  );
};

export default EditProductContent;
