import {Component, OnInit} from '@angular/core';
import {FoodService} from '../../core/services/food.service';
import {Food} from '../../core/models/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  foods: Food[];

  constructor(private foodService: FoodService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.foodService.list().subscribe(
      data => {
        this.foods = data;
      }
    );
  }
}
