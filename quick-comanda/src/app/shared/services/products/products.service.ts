import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, Firestore, orderBy, query, serverTimestamp, where } from "@angular/fire/firestore";
import { FormattedProduct, Product } from "../../models/product.model";
import { map, Observable } from "rxjs";
import { CategoryService } from "../categories/category.service";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private firestore = inject(Firestore);
  private categorysService = inject(CategoryService);

  /**
   * Creates a new product in the Firestore database.
   *
   * @param product - The product data to be created, excluding the `id` field.
   * @returns A promise that resolves to the ID of the newly created product document.
   *
   * @remarks
   * This method uses Firestore's `addDoc` function to add a new document to the
   * 'products' collection. The `createdAt` and `updatedAt` fields are automatically
   * set to the current server timestamp.
   *
   * @throws Will throw an error if the Firestore operation fails.
   */
  async createProduct(product: Omit<Product, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(this.firestore, 'products'), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  }

  /**
   * Retrieves a list of products from the Firestore 'products' collection and formats them.
   *
   * @returns An observable that emits an array of formatted products.
   */
  getProducts(): Observable<FormattedProduct[]> {
    return collectionData(collection(this.firestore, 'products'), {
      idField: 'id'
    }).pipe(
      map(products => this.formatProducts(products as Product[]))
    );
  }

  /**
   * Retrieves a list of formatted products filtered by the specified category.
   *
   * @param category - The category to filter products by.
   * @returns An observable that emits an array of formatted products.
   */
  getProductsByCategory(category: string): Observable<FormattedProduct[]> {
    const q = query(
      collection(this.firestore, 'products'),
      where('category', '==', category),
      orderBy('name')
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map(products => this.formatProducts(products as Product[]))
    );;
  }

  private formatProducts(products: Product[]): FormattedProduct[] {
    return products.map(product => ({
      ...product,
      formattedPrice: this.formatPrice(product.price),
      categoryDTO: this.categorysService.getCategory(product.category) || { value: '', label: 'Categoria desconhecida', icon: '' }
    }));
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
}