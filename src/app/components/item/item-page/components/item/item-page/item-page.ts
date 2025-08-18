import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from '../../../../item-form/item-form';
import { ItemService } from '../../../../../../services/item/item.service';
import { Item } from '../../../../../../models/item.model';
import { ItemListComponent } from '../../../../item-list/item-list';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, ItemListComponent],
  templateUrl: './item-page.html',
  styleUrls: ['./item-page.css']
})
export class ItemPageComponent implements OnInit {
  items: Item[] = [];
  showForm = false;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error(err)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onItemSaved() {
    this.showForm = false;
    this.loadItems();
  }

  deleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    this.itemService.deleteItem(id).subscribe({
      next: () => this.loadItems(),
      error: (err) => console.error(err)
    });
  }

  editItem(item: Item) {
    alert(`Edit feature for "${item.name}" coming soon!`);
  }
}
