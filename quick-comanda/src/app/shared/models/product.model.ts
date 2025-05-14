import { FieldValue } from "@angular/fire/firestore";
import { Category } from "./category.model";

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
  categoryDTO: Category
}

export type ProductCategory = 'food' | 'drink' | 'portion' | 'other';