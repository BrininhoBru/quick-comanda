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

export type ProductCategory = 'food' | 'drink' | 'portion' | 'other';