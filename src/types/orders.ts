import { Status } from './status';

export interface Order {
  statuses?: Status;
  id?: string;
  created_at?: string;
  full_price: number;
  updated_at?: string;
  updated_by: string;
  status?: string;
  user_id: string;
  order_product?: Array<{
    products?: {
      id: string;
      name: string;
      image_url: string;
    };
    product_quantity: number;
  }>;
}

export interface OrderProduct {
  order: string;
  product_id: string;
  product_quantity: number;
}

export interface OrderWithProducts extends Order {
  products?: OrderProduct[];
}
