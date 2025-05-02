import { FieldValue } from "@angular/fire/firestore";

export interface Product {
  readonly id?: string;
  name: string;
  price: number;
  category: ProductCategory;
  isAvailable: boolean;
  imageUrl?: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export interface FormattedProduct extends Product {
  formattedPrice: string;
  categoryLabel: string;
}

export type ProductCategory = 'food' | 'drink' | 'portion' | 'other';