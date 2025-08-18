import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css']
})
export class ItemListComponent {
  @Input() items: Item[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Item>();

  onDelete(id: string) {
    this.delete.emit(id);
  }

  onEdit(item: Item) {
    this.edit.emit(item);
  }
}
