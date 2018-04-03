import { Component, OnInit } from '@angular/core';
import { AttributeService } from './attribute.service';
import { Attribute } from './attribute.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventManager } from './../../shared/event-manager.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html'
})

export class AttributeComponent implements OnInit {
  attributes: Attribute[];
  eventSubscriber: Subscription;

  constructor(
    private attributeService: AttributeService,
    private eventManager: EventManager
  ) { }

  loadAll() {
    this.attributeService.query().subscribe(
      (res: HttpResponse<Attribute[]>) => {
        this.attributes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  ngOnInit() {
    this.loadAll();
    this.registerChangeInAttributes();
  }

  registerChangeInAttributes() {
    this.eventSubscriber = this.eventManager.subscribe('attributeListModification', (response) => this.loadAll());
  }

  private onError(error) {
    console.log(error);
    alert('OOPS, implement real alerting');
  }
}
