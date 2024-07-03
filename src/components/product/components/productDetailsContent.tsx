import { Spin, Descriptions } from 'antd';
import { useGetProductByIdQuery } from '../../../api/productHandlers';
import { ProductDetailContentProps, Review } from '../../../types/product';

const ProductDetailContent= ({ productId = 0 }:ProductDetailContentProps) => {
  const { data, error, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error loading product details</div>;
  }

  if (!data) {
    return <div>No product data available</div>;
  }

  return (
    <Descriptions bordered layout="vertical" labelStyle={{ fontWeight: 'bold' }}>
      <Descriptions.Item label="Title">{data.title}</Descriptions.Item>
      <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
      <Descriptions.Item label="Category">{data.category}</Descriptions.Item>
      <Descriptions.Item label="Price">${data.price}</Descriptions.Item>
      <Descriptions.Item label="Rating">{data.rating}</Descriptions.Item>
      <Descriptions.Item label="Stock">{data.stock}</Descriptions.Item>
      <Descriptions.Item label="Brand">{data.brand}</Descriptions.Item>
      <Descriptions.Item label="SKU">{data.sku}</Descriptions.Item>
      <Descriptions.Item label="Weight">{data.weight}</Descriptions.Item>
      <Descriptions.Item label="Dimensions">
        {`W: ${data.dimensions.width} H: ${data.dimensions.height} D: ${data.dimensions.depth}`}
      </Descriptions.Item>
      <Descriptions.Item label="Warranty Information">{data.warrantyInformation}</Descriptions.Item>
      <Descriptions.Item label="Shipping Information">{data.shippingInformation}</Descriptions.Item>
      <Descriptions.Item label="Availability Status">{data.availabilityStatus}</Descriptions.Item>
      <Descriptions.Item label="Return Policy">{data.returnPolicy}</Descriptions.Item>
      <Descriptions.Item label="Minimum Order Quantity">{data.minimumOrderQuantity}</Descriptions.Item>
      <Descriptions.Item label="QR Code">
        <img src={data.meta.qrCode} alt="QR Code" />
      </Descriptions.Item>
      <Descriptions.Item label="Reviews" style={{ minWidth: '500px' }}>
        {data?.reviews.map((review: Review, index: number) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <p>{`Rating: ${review.rating}`}</p>
            <p>{`Comment: ${review.comment}`}</p>
            <p>{`Reviewer: ${review.reviewerName}`}</p>
            <p>{`Email: ${review.reviewerEmail}`}</p>
            <p>{`Date: ${review.date}`}</p>
          </div>
        ))}
      </Descriptions.Item>
      <Descriptions.Item label="Thumbnail">
        <img src={data.thumbnail} alt="Thumbnail" style={{ width: '100px' }} />
      </Descriptions.Item>
    </Descriptions>
  );
};

ProductDetailContent.defaultProps = {
  productId: 0,
};

export default ProductDetailContent;
