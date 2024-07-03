import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../api/productHandlers';

const ProductDetail: React.FC = () => {
    console.log("I am in product detail")
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{width: '50%', margin: '0 auto'}}>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <p>Price: ${data?.price}</p>
      {/* Add more product details */}
    </div>
  );
};

export default ProductDetail;
