import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { EventManager } from './../../shared/event-manager.service';

import { AttributeValue } from './attribute-value.model';
import { AttributeValueService } from './attribute-value.service';

@Component({
  selector: 'app-attribute-value-detail',
  templateUrl: './attribute-value-detail.component.html'
})
export class AttributeValueDetailComponent implements OnInit, OnDestroy {

  attributeValue: AttributeValue;
  private subscription: Subscription;
  private eventSubscriber: Subscription;

  constructor(
    private eventManager: EventManager,
    private attributeValueService: AttributeValueService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
    this.registerChangeInAttributeValues();
  }

  load(id) {
    this.attributeValueService.find(id)
      .subscribe((attributeValueResponse: HttpResponse<AttributeValue>) => {
        this.attributeValue = attributeValueResponse.body;
      });
  }
  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.eventManager.destroy(this.eventSubscriber);
  }

  registerChangeInAttributeValues() {
    this.eventSubscriber = this.eventManager.subscribe(
      'attributeValueListModification',
      (response) => this.load(this.attributeValue.id)
    );
  }
}
