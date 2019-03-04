import { Component } from '@angular/core';
import { SweetChild } from "./child.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'access-child';

  public childs: SweetChild[] = [];

  private childDatas: any[] = [];

  ngAfterViewInit() {
	  this.childs = [];
	  for (let i = 0; i < 5; i++) {
		  let child = {
			  "dataToChild": "I am child " + (i + 1)
		  };
		  this.childDatas.push(child);
	  }
  }
}
