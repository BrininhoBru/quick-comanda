import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { collection, serverTimestamp } from 'firebase/firestore';
import { CategoryService } from '../../services/categories/category.service';

@Component({
  selector: 'quick-products-registration-modal',
  templateUrl: './products-registration-modal.component.html',
  styleUrls: ['./products-registration-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class ProductsRegistrationModalComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);
  private categoryService = inject(CategoryService);
  private productsService = inject(ProductsService);

  @Input() productId: string = '';

  editMode = false;
  productForm!: FormGroup;
  imagePreview = signal<string | null>(null);
  loading = signal(false);

  categories = this.categoryService.getAllCategories();

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', [
        Validators.required,
        (control: FormControl) => this.categoryService.isValidCategory(control.value)
          ? null
          : { invalidCategory: true }
      ]],
      imageUrl: ['']
    });
  }

  async submit() {
    if (this.productForm.invalid) return;

    this.loading.set(true);

    const productData = {
      ...this.productForm.value,
      imageUrl: this.productForm.value.imageUrl || 'assets/placeholder.png'
    };

    try {
      const productRef = this.productId ? doc(this.firestore, `products/${this.productId}`) : doc(collection(this.firestore, 'products'));

      await setDoc(productRef, {
        ...productData,
        price: Number(productData.price),
        updateAt: serverTimestamp(),
        createdAt: this.productId ? undefined : serverTimestamp(),
      });

      this.modalCtrl.dismiss(true);
    }
    catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
    finally {
      this.loading.set(false);
      this.closeModal();
    }
  }

  async uploadImage() {
    // Implementação do upload para Firebase Storage
    // Atualiza imagePreview() e productForm.imageUrl
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
