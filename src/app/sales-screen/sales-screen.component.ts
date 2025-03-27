import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sales-screen',
  templateUrl: './sales-screen.component.html',
  styleUrls: ['./sales-screen.component.css']
})
export class SalesScreenComponent implements OnInit {
  currentLanguage: string = 'en';
  products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ];
  filteredProducts = [...this.products];
  cartItems: { product: any, quantity: number }[] = [];
  totalAmount: number = 0;
  discountPercentage: number = 0;
  taxPercentage: number = 0;
  discountAmount: number = 0;
  taxAmount: number = 0;
  finalTotal: number = 0;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.loadCart();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
  }

  searchProducts(query: string) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product: product, quantity: 1 });
    }
    this.updateTotal();
    this.saveCart();
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product.id !== item.product.id);
    this.updateTotal();
    this.saveCart();
  }

  updateQuantity(item: any, quantity: number) {
    if (quantity > 0) {
      item.quantity = quantity;
      this.updateTotal();
      this.saveCart();
    }
  }

  updateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    this.discountAmount = (this.totalAmount * this.discountPercentage) / 100;
    this.taxAmount = ((this.totalAmount - this.discountAmount) * this.taxPercentage) / 100;
    this.finalTotal = this.totalAmount - this.discountAmount + this.taxAmount;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateTotal();
    }
  }

  generateReceipt() {
    const receiptWindow = window.open('', '_blank');
    if (receiptWindow) {
      receiptWindow.document.write('<html><head><title>Receipt</title></head><body>');
      receiptWindow.document.write('<h1>Receipt</h1>');
      receiptWindow.document.write('<ul>');
      this.cartItems.forEach(item => {
        receiptWindow.document.write(`<li>${item.product.name} - Quantity: ${item.quantity} - Price: ${item.product.price * item.quantity}</li>`);
      });
      receiptWindow.document.write('</ul>');
      receiptWindow.document.write(`<p>Total: ${this.totalAmount}</p>`);
      receiptWindow.document.write(`<p>Discount: ${this.discountAmount}</p>`);
      receiptWindow.document.write(`<p>Tax: ${this.taxAmount}</p>`);
      receiptWindow.document.write(`<p>Final Total: ${this.finalTotal}</p>`);
      receiptWindow.document.write('</body></html>');
      receiptWindow.document.close();
      receiptWindow.print();
    }
  }
}
