import { Injectable } from '@angular/core';
import { CATEGORIES, CATEGORIES_ARRAY } from '../../constants/categories.const';
import { Category, CategoryValue } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  /**
   * Retrieves all categories from the predefined categories array.
   *
   * @returns {Category[]} An array of categories.
   */
  getAllCategories(): Category[] {
    return CATEGORIES_ARRAY;
  }

  /**
   * Retrieves a category from the predefined `CATEGORIES` object based on the provided key.
   *
   * @param value - The key representing the category to retrieve.
   * @returns The corresponding `Category` object if the key exists in `CATEGORIES`, otherwise `undefined`.
   */
  getCategory(value: string): Category | undefined {
    return CATEGORIES[value as keyof typeof CATEGORIES];
  }

  /**
   * Checks if the provided value is a valid category.
   *
   * @param value - The string value to validate as a category.
   * @returns A type predicate indicating whether the value is a valid `CategoryValue`.
   */
  isValidCategory(value: string): value is CategoryValue {
    return value in CATEGORIES;
  }

  /**
   * Retrieves the label of a category based on its value.
   *
   * @param value - The unique identifier of the category.
   * @returns The label of the category if found; otherwise, returns 'Categoria desconhecida'.
   */
  getCategoryLabel(value: string): string {
    const category = this.getCategory(value);
    return category ? category.label : 'Categoria desconhecida';
  }
}
