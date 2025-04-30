export interface Product {
  readonly id?: string;
  name: string;
  price: number;
  category: ProductCategory;
  isAvailable: boolean;
  imageUrl?: string;
}

export type ProductCategory = 'food' | 'drink' | 'portion' | 'other';