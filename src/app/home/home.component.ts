import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TreeNode } from './tree-node.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  nodes: TreeNode[];
  options = {};

  constructor(private treeService: TreeService) { }

  loadTree() {
    this.treeService.findByCategory(1).subscribe(
      (res: HttpResponse<TreeNode>) => {
        this.nodes = [res.body];
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  ngOnInit() {
    this.loadTree();
  }

  private onError(error) {
    alert('OOPS, implement real alerting');
  }
}
