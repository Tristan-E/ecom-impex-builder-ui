import { Component, OnInit } from '@angular/core';
import { AttributeValueService } from './attribute-value.service';
import { AttributeValue } from './attribute-value.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventManager } from './../../shared/event-manager.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-attribute-value',
  templateUrl: './attribute-value.component.html'
})

export class AttributeValueComponent implements OnInit {
  attributeValues: AttributeValue[];
  eventSubscriber: Subscription;

  constructor(
    private attributeValueService: AttributeValueService,
    private eventManager: EventManager
  ) { }

  loadAll() {
    this.attributeValueService.query().subscribe(
      (res: HttpResponse<AttributeValue[]>) => {
        this.attributeValues = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  ngOnInit() {
    this.loadAll();
    this.registerChangeInAttributeValues();
  }

  registerChangeInAttributeValues() {
    this.eventSubscriber = this.eventManager.subscribe('attributeValueListModification', (response) => this.loadAll());
  }

  private onError(error) {
    alert('OOPS, implement real alerting');
  }
}
