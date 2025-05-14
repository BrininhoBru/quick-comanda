import { Injectable } from '@angular/core';
import { CATEGORIES, CATEGORIES_ARRAY } from '../../constants/categories.const';
import { Category, CategoryValue } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getAllCategories(): Category[] {
    return CATEGORIES_ARRAY;
  }

  getCategory(value: string): Category | undefined {
    return CATEGORIES[value as keyof typeof CATEGORIES];
  }

  isValidCategory(value: string): value is CategoryValue {
    return value in CATEGORIES;
  }

  getCategoryLabel(value: string): string {
    const category = this.getCategory(value);
    return category ? category.label : 'Categoria desconhecida';
  }
}
