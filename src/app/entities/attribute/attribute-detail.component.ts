import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { EventManager } from './../../shared/event-manager.service';

import { Attribute } from './attribute.model';
import { AttributeService } from './attribute.service';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html'
})
export class AttributeDetailComponent implements OnInit, OnDestroy {

  attribute: Attribute;
  private subscription: Subscription;
  private eventSubscriber: Subscription;

  constructor(
    private eventManager: EventManager,
    private attributeService: AttributeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
    this.registerChangeInCategories();
  }

  load(id) {
    this.attributeService.find(id)
      .subscribe((attributeResponse: HttpResponse<Attribute>) => {
        this.attribute = attributeResponse.body;
      });
  }
  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.eventManager.destroy(this.eventSubscriber);
  }

  registerChangeInCategories() {
    this.eventSubscriber = this.eventManager.subscribe(
      'attributeListModification',
      (response) => this.load(this.attribute.id)
    );
  }
}
