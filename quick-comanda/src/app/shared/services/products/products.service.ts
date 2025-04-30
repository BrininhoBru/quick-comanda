import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, Firestore, orderBy, query, serverTimestamp, where } from "@angular/fire/firestore";
import { Product } from "../../models/product.model";
import { Observable } from "rxjs";

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
   * The function `getProducts` retrieves products from a Firestore collection and returns them as an
   * Observable array of Product objects.
   * @returns An Observable of Product array is being returned.
   */
  getProducts() {
    return collectionData(collection(this.firestore, 'products'), {
      idField: 'id'
    }) as Observable<Product[]>;
  }

  /**
   * This function retrieves products from a Firestore collection based on a specified category and
   * returns them ordered by name.
   * @param {string} category - The `getProductsByCategory` function takes a `category` parameter,
   * which is a string representing the category of products you want to retrieve from the Firestore
   * database. The function queries the 'products' collection in Firestore to fetch products that
   * belong to the specified category, orders them by name, and returns
   * @returns An array of products that belong to the specified category, sorted by name. Each product
   * object in the array includes an 'id' field.
   */
  getProductsByCategory(category: string) {
    const q = query(
      collection(this.firestore, 'products'),
      where('category', '==', category),
      orderBy('name')
    );
    return collectionData(q, { idField: 'id' });
  }
}