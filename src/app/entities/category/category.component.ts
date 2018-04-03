import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventManager } from './../../shared/event-manager.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})

export class CategoryComponent implements OnInit {
  categories: Category[];
  eventSubscriber: Subscription;

  constructor(
    private categoryService: CategoryService,
    private eventManager: EventManager
  ) { }

  loadAll() {
    this.categoryService.query().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  ngOnInit() {
    this.loadAll();
    this.registerChangeInCategories();
  }

  registerChangeInCategories() {
    this.eventSubscriber = this.eventManager.subscribe('categoryListModification', (response) => this.loadAll());
  }

  private onError(error) {
    alert('OOPS, implement real alerting');
  }
}
