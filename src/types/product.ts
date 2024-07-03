export interface EditProductContentProps {
  productId: number;
  onClose: () => void;
}


export interface ProductDetailContentProps {
  productId: number;
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  export interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  export interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
  }

  export interface UpdateProductRequest {
    id: number;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    sku?: string;
    weight?: string;
    dimensions?: Partial<Dimensions>;
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: Partial<Meta>;
    reviews?: Review[];
    thumbnail?: string;
    images?: string[];
  }
  
  export interface GetProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  // Define the type for the query parameters
  export interface GetProductsQueryParams {
    limit: number;
    skip: number;
  }
  