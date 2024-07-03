import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Spin, message, Upload } from 'antd';
import { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../api/productHandlers';
import { useGetCategoriesQuery } from '../../../api/categoryHandlers';
import { EditProductContentProps, Product } from '../../../types/product';
import { Category } from '../../../types/category';
import { RcFile } from 'antd/es/upload/interface';

type FileType = RcFile;

const EditProductContent = ({ productId, onClose }: EditProductContentProps) => {
  const { data: product, error: productError, isLoading: productLoading } = useGetProductByIdQuery(productId);
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery({ limit: 0, skip: 0 });
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (product) {
      const initialFiles = product.images.map((url: string, index: number) => ({
        uid: `${index}`,
        name: `image${index + 1}`,
        status: 'done',
        url,
      }));
      setFileList(initialFiles);
    }
  }, [product]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  if (productLoading || categoriesLoading) return <Spin tip="Loading..." />;
  if (productError || categoriesError) {
    message.error('Failed to load data');
    return <div>Error loading data</div>;
  }

  const onFinish = async (values: Partial<Product>) => {
    const images = fileList.filter(file => file.status === 'done').map(file => file.url);
    const updatedProduct = { ...product, ...values, images };
    await updateProduct(updatedProduct);
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
            {categories?.map((category: Category) => (
              <Select.Option key={category.slug} value={category.slug}>
                {category.name}
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
        <Form.Item name="images" label="Product Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple
          >
            {fileList.length < 10 && '+ Upload'}
          </Upload>
        </Form.Item>
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
