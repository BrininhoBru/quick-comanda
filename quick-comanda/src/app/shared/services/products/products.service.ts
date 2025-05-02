import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, Firestore, orderBy, query, serverTimestamp, where } from "@angular/fire/firestore";
import { FormattedProduct, Product } from "../../models/product.model";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private firestore = inject(Firestore);

  /**
   * The function `createProduct` asynchronously adds a new product to a Firestore collection with
   * timestamps for creation and update.
   * @param product - The `product` parameter is an object that represents a product with properties
   * such as `name`, `price`, `description`, and any other relevant information about the product. The
   * `Omit<Product, 'id'>` type indicates that the `id` property should be omitted from the `product`
   * @returns The function `createProduct` is returning the `id` of the newly created product document
   * in the Firestore database.
   */
  async createProduct(product: Omit<Product, 'id'>) {
    const docRef = await addDoc(collection(this.firestore, 'products'), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  }

  /**
   * The function retrieves products from a Firestore collection and formats them before returning
   * them.
   * @returns The `getProducts()` function is returning an Observable that emits an array of products
   * after formatting them using the `formatProducts()` method. The products are retrieved from a
   * Firestore collection named 'products' and the 'idField' option is set to 'id' for identifying the
   * document IDs.
   */
  getProducts() {
    return collectionData(collection(this.firestore, 'products'), {
      idField: 'id'
    }).pipe(
      map(products => this.formatProducts(products as Product[]))
    );
  }

/**
 * The function `getProductsByCategory` retrieves products from a Firestore collection based on a
 * specified category and returns them in a formatted manner.
 * @param {string} category - The `getProductsByCategory` function takes a `category` parameter as
 * input. This parameter is used to query the Firestore database for products that belong to the
 * specified category. The function then orders the products by name and returns the formatted products
 * as an observable stream.
 * @returns The `getProductsByCategory` function is returning an Observable that emits an array of
 * products filtered by the specified category. The products are formatted using the `formatProducts`
 * method before being emitted by the Observable.
 */
  getProductsByCategory(category: string) {
    const q = query(
      collection(this.firestore, 'products'),
      where('category', '==', category),
      orderBy('name')
    );

    return collectionData(q, { idField: 'id' }).pipe(
      map(products => this.formatProducts(products as Product[]))
    );;
  }

/**
 * The function getCategoryLabel takes a category string as input and returns the corresponding label
 * from a predefined mapping, or the original category if no match is found.
 * @param {string} category - The `getCategoryLabel` function takes a `category` parameter, which is a
 * string representing a category of items. The function then looks up this category in a predefined
 * object `categories` to get the corresponding label for that category. If the category is found in
 * the object, it returns the corresponding
 * @returns The function `getCategoryLabel` takes a `category` string as input and returns the
 * corresponding label from the `categories` object. If the `category` matches one of the keys in the
 * `categories` object, it returns the corresponding label. If the `category` does not match any key in
 * the `categories` object, it returns the original `category` string.
 */
  getCategoryLabel(category: string): string {
    const categories: Record<string, string> = {
      'bebidas': 'Bebidas',
      'pratos': 'Pratos Principais',
      'sobremesas': 'Sobremesas'
    };
    return categories[category] || category;
  }

  private formatProducts(products: Product[]): FormattedProduct[] {
    return products.map(product => ({
      ...product,
      formattedPrice: this.formatPrice(product.price),
      categoryLabel: this.getCategoryLabel(product.category)
    }));
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
}