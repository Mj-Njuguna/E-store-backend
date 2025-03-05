export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  storeId: string;
}

export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  storeId: string;
  billboardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  storeId: string;
  categoryId: string;
  sizeId: string;
  colorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  storeId: string;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
}

export interface Image {
  id: string;
  url: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}
