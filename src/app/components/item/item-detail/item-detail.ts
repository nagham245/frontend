import { Component, Input } from '@angular/core';
import { Item } from '../../../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.html',
  styleUrls: ['./item-detail.css']
})
export class ItemDetailComponent {
  @Input() item!: Item;
}
