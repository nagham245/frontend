import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../services/item/item.service';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemFormComponent {
  @Output() itemSaved = new EventEmitter<void>();

  item: Item = { name: '', price: 0, description: '', image: '' };
  selectedFile: File | null = null;

  constructor(private itemService: ItemService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveItem() {
    if (!this.selectedFile) {
      alert("⚠️ Image is required");
      return;
    }

    this.itemService.createItem(this.item, this.selectedFile).subscribe({
      next: () => {
        alert("✅ Item saved successfully");
        this.item = { name: '', price: 0, description: '', image: '' };
        this.selectedFile = null;
        this.itemSaved.emit();
      },
      error: (err) => console.error(err)
    });
  }
}
