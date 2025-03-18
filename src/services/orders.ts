import { supabase } from '../lib/supabase';
import { Order, OrderProduct } from '../types/orders';

export const getOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      statuses (status_name)
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Order[];
};

export const createOrder = async (order: Order, orderProducts: OrderProduct[]) => {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (orderError) throw orderError;

  const productsWithOrder = orderProducts.map(product => ({
    ...product,
    order: orderData.id,
  }));

  const { error: productsError } = await supabase.from('order_product').insert(productsWithOrder);

  if (productsError) throw productsError;

  return orderData as Order;
};
