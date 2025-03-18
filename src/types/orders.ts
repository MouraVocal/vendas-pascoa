export interface Order {
  id?: string;
  created_at?: string;
  full_price: number;
  updated_at?: string;
  updated_by: string;
  status?: string;
  user_id: string;
}

export interface OrderProduct {
  order: string;
  product_id: string;
  product_quantity: number;
}

export interface OrderWithProducts extends Order {
  products?: OrderProduct[];
}
