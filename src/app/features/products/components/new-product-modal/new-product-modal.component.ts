import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-product-modal',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './new-product-modal.component.html',
  styleUrl: './new-product-modal.component.css'
})
export class NewProductModalComponent {
  private readonly newProductModalRef: MatDialogRef<NewProductModalComponent> = inject(MatDialogRef<NewProductModalComponent>);

  onConfirmClick(): void {

  }

  onCancelClick(): void {
    this.newProductModalRef.close();
  }
}
