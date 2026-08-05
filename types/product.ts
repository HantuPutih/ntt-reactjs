export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  sku?: string;
  thumbnail: string;
  images?: string[];
  isDeleted?: boolean;
  deletedOn?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
}


export interface AddProductRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
}

export interface UpdateProductRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
}

export interface ApiErrorResponse {
  message: string;
}